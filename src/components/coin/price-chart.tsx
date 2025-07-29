'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChartProps {
  data: number[];
  width?: number;
  height?: number;
  showGradient?: boolean;
  showGrid?: boolean;
  className?: string;
}

export function PriceChart({
  data,
  width = 400,
  height = 200,
  showGradient = true,
  showGrid = true,
  className = '',
}: PriceChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const validData = data.filter(
      (price) => price !== null && price !== undefined && !isNaN(price),
    );
    if (validData.length === 0) return null;

    const min = Math.min(...validData);
    const max = Math.max(...validData);
    const range = max - min || 1;

    const points = validData.map((value, index) => {
      const x = (index / (validData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return { x, y, value };
    });

    const isPositive = validData[validData.length - 1] > validData[0];
    const path = `M${points.map((p) => `${p.x},${p.y}`).join('L')}`;

    // Área para gradiente
    const areaPath = `${path}L${width},${height}L0,${height}Z`;

    return {
      points,
      path,
      areaPath,
      isPositive,
      min,
      max,
      range,
      firstValue: validData[0],
      lastValue: validData[validData.length - 1],
      change:
        ((validData[validData.length - 1] - validData[0]) / validData[0]) * 100,
    };
  }, [data, width, height]);

  if (!chartData) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <p className="text-muted-foreground text-sm">Dados não disponíveis</p>
      </div>
    );
  }

  const { path, areaPath, isPositive, change } = chartData;
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          {showGradient && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.05" />
            </linearGradient>
          )}
        </defs>

        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal lines */}
            {[0.25, 0.5, 0.75].map((ratio, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={height * ratio}
                x2={width}
                y2={height * ratio}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
            {/* Vertical lines */}
            {[0.25, 0.5, 0.75].map((ratio, i) => (
              <line
                key={`v-${i}`}
                x1={width * ratio}
                y1="0"
                x2={width * ratio}
                y2={height}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
          </g>
        )}

        {/* Área com gradiente */}
        {showGradient && <path d={areaPath} fill={`url(#${gradientId})`} />}

        {/* Linha principal */}
        <path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="drop-shadow-sm"
        />

        {/* Pontos de destaque */}
        <circle
          cx={0}
          cy={chartData.points[0]?.y || 0}
          r="3"
          fill={strokeColor}
          className="opacity-60"
        />
        <circle
          cx={width}
          cy={chartData.points[chartData.points.length - 1]?.y || 0}
          r="3"
          fill={strokeColor}
        />
      </svg>

      {/* Indicador de mudança */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium">
        {isPositive ? (
          <TrendingUp className="h-3 w-3 text-green-600" />
        ) : (
          <TrendingDown className="h-3 w-3 text-red-600" />
        )}
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
          {change > 0 ? '+' : ''}
          {change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
