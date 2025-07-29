import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | string | null | undefined,
): string {
  const num = Number(value);

  if (isNaN(num) || num === null || num === undefined) {
    return 'N/A';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: num < 1 ? 6 : 2,
    maximumFractionDigits: num < 1 ? 6 : 2,
  }).format(num);
}

export function formatPercentage(
  value: number | string | null | undefined,
): string {
  const num = Number(value);

  if (isNaN(num) || num === null || num === undefined) {
    return '0.00%';
  }

  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
}

export function formatNumber(
  value: number | string | null | undefined,
): string {
  const num = Number(value);

  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }

  return new Intl.NumberFormat('pt-BR').format(num);
}

export function formatMarketCap(
  value: number | string | null | undefined,
): string {
  const num = Number(value);

  if (isNaN(num) || num === null || num === undefined) {
    return 'N/A';
  }

  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toLocaleString()}`;
}

export function safeNumber(value: any, fallback = 0): number {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
}

export function formatDate(date: string | Date): string {
  try {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Data inválida';
  }
}

export function formatDateTime(date: string | Date): string {
  try {
    return new Date(date).toLocaleString('pt-BR');
  } catch {
    return 'Data inválida';
  }
}
