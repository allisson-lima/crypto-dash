'use client';

import { useMemo } from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  data,
  width = 100,
  height = 40,
  color = '#10b981',
}: SparklineProps) {
  const path = useMemo(() => {
    if (!data || data.length === 0) return '';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M${points.join('L')}`;
  }, [data, width, height]);

  const isPositive = data && data.length > 0 && data[data.length - 1] > data[0];

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      id="sparkline"
    >
      <path
        d={path}
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
