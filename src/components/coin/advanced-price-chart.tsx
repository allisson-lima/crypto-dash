'use client';

import type React from 'react';
import { useMemo, useState, useRef, useEffect } from 'react';
import { DollarSign, BarChart3, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatMarketCap } from '@/lib/utils';

interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface AdvancedPriceChartProps {
  data: MarketChartData;
  days: number;
  height?: number;
}

type ChartType = 'price' | 'volume' | 'market_cap';

export function AdvancedPriceChart({
  data,
  days,
  height = 400,
}: AdvancedPriceChartProps) {
  const [activeChart, setActiveChart] = useState<ChartType>('price');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Calcular largura dinamicamente
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Subtrair padding e bordas para largura real disponível
        setContainerWidth(Math.max(300, rect.width - 32)); // 32px para padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const chartData = useMemo(() => {
    const getDataByType = (type: ChartType) => {
      switch (type) {
        case 'price':
          return data.prices;
        case 'volume':
          return data.total_volumes;
        case 'market_cap':
          return data.market_caps;
        default:
          return data.prices;
      }
    };

    const rawData = getDataByType(activeChart);
    if (!rawData || rawData.length === 0) return null;

    const values = rawData.map(([, value]) => value);
    const timestamps = rawData.map(([timestamp]) => timestamp);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    // Usar largura dinâmica com margens mínimas
    const chartWidth = containerWidth - 40; // 20px margem de cada lado
    const chartHeight = height - 80; // Espaço para labels e controles

    const points = rawData.map(([timestamp, value], index) => {
      const x = 20 + (index / (rawData.length - 1)) * chartWidth; // 20px margem esquerda
      const y =
        40 + (chartHeight - 40) - ((value - min) / range) * (chartHeight - 40); // 40px margem top/bottom
      return { x, y, value, timestamp, index };
    });

    const isPositive = values[values.length - 1] > values[0];
    const path = `M${points.map((p) => `${p.x},${p.y}`).join('L')}`;
    const areaPath = `${path}L${20 + chartWidth},${chartHeight + 40}L20,${chartHeight + 40}Z`;

    return {
      points,
      path,
      areaPath,
      isPositive,
      min,
      max,
      range,
      width: containerWidth,
      chartWidth,
      chartHeight,
      values,
      timestamps,
    };
  }, [data, activeChart, height, containerWidth]);

  const formatValue = (value: number, type: ChartType) => {
    switch (type) {
      case 'price':
        return formatCurrency(value);
      case 'volume':
      case 'market_cap':
        return formatMarketCap(value);
      default:
        return formatCurrency(value);
    }
  };

  const getChartColor = (type: ChartType, isPositive: boolean) => {
    if (type === 'volume') return '#8b5cf6'; // Purple
    if (type === 'market_cap') return '#f59e0b'; // Amber
    return isPositive ? '#10b981' : '#ef4444'; // Green/Red for price
  };

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    if (!chartData || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Calcular índice baseado na posição relativa dentro da área do gráfico
    const relativeX = Math.max(0, Math.min(chartData.chartWidth, x - 20));
    const pointIndex = Math.round(
      (relativeX / chartData.chartWidth) * (chartData.points.length - 1),
    );
    const point = chartData.points[pointIndex];

    if (point) {
      setTooltipData({
        value: point.value,
        timestamp: point.timestamp,
        x: event.clientX,
        y: event.clientY,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipData(null);
  };

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Dados não disponíveis</p>
        </div>
      </div>
    );
  }

  const strokeColor = getChartColor(activeChart, chartData.isPositive);
  const gradientId = `gradient-${activeChart}`;

  return (
    <div className="w-full space-y-3" ref={containerRef}>
      {/* Controles do Gráfico - Compactos */}
      <div className="flex items-center gap-1 flex-wrap">
        <Button
          variant={activeChart === 'price' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveChart('price')}
          className="h-8 px-3"
        >
          <DollarSign className="h-3 w-3 mr-1" />
          Preço
        </Button>
        <Button
          variant={activeChart === 'volume' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveChart('volume')}
          className="h-8 px-3"
        >
          <BarChart3 className="h-3 w-3 mr-1" />
          Volume
        </Button>
        <Button
          variant={activeChart === 'market_cap' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveChart('market_cap')}
          className="h-8 px-3"
        >
          <Activity className="h-3 w-3 mr-1" />
          Market Cap
        </Button>
      </div>

      {/* Gráfico SVG - Largura Total */}
      <div className="relative w-full overflow-hidden rounded-lg border bg-background">
        <svg
          ref={svgRef}
          width={chartData.width}
          height={height}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines - Ajustadas para nova área */}
          <g className="opacity-10">
            {[0.25, 0.5, 0.75].map((ratio, i) => (
              <line
                key={`h-${i}`}
                x1="20"
                y1={40 + (chartData.chartHeight - 40) * ratio}
                x2={20 + chartData.chartWidth}
                y2={40 + (chartData.chartHeight - 40) * ratio}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            ))}
            {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => (
              <line
                key={`v-${i}`}
                x1={20 + chartData.chartWidth * ratio}
                y1="40"
                x2={20 + chartData.chartWidth * ratio}
                y2={chartData.chartHeight + 40}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            ))}
          </g>

          {/* Área com gradiente */}
          <path d={chartData.areaPath} fill={`url(#${gradientId})`} />

          {/* Linha principal */}
          <path
            d={chartData.path}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-sm"
          />

          {/* Pontos de destaque */}
          <circle
            cx={chartData.points[0]?.x || 0}
            cy={chartData.points[0]?.y || 0}
            r="4"
            fill={strokeColor}
            className="opacity-70"
          />
          <circle
            cx={chartData.points[chartData.points.length - 1]?.x || 0}
            cy={chartData.points[chartData.points.length - 1]?.y || 0}
            r="4"
            fill={strokeColor}
            stroke="white"
            strokeWidth="2"
          />

          {/* Labels dos valores - Posicionados melhor */}
          <text
            x="25"
            y="30"
            className="text-xs fill-muted-foreground font-medium"
          >
            Máx: {formatValue(chartData.max, activeChart)}
          </text>
          <text
            x="25"
            y={chartData.chartHeight + 35}
            className="text-xs fill-muted-foreground font-medium"
          >
            Mín: {formatValue(chartData.min, activeChart)}
          </text>

          {/* Label do valor atual */}
          <text
            x={chartData.width - 25}
            y="30"
            className="text-xs fill-muted-foreground font-medium text-end"
            textAnchor="end"
          >
            Atual:{' '}
            {formatValue(
              chartData.values[chartData.values.length - 1],
              activeChart,
            )}
          </text>
        </svg>

        {/* Tooltip */}
        {showTooltip && tooltipData && (
          <div
            className="fixed z-50 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3 pointer-events-none"
            style={{
              left: Math.min(tooltipData.x + 10, window.innerWidth - 200),
              top: tooltipData.y - 70,
            }}
          >
            <div className="text-sm font-semibold">
              {formatValue(tooltipData.value, activeChart)}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(tooltipData.timestamp).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )}
      </div>

      {/* Informações do período - Compactas */}
      <div className="text-xs text-muted-foreground text-center py-1">
        {chartData.points.length} pontos • {days} dias • Atualizado a cada 30s
      </div>
    </div>
  );
}
