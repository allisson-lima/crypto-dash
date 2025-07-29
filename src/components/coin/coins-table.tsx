'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sparkline } from '../sparkline';

import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSkeleton } from '../loading-skeleton';
import { Coin } from '@/types/coin';
import { useCryptoStore } from '@/store/crypto-store';

interface CoinsTableProps {
  coins: Coin[];
  isLoading?: boolean;
  error?: string | null;
  isError?: boolean;
}

export function CoinsTable({
  coins,
  isLoading,
  error,
  isError,
}: CoinsTableProps) {
  const { favorites, toggleFavorite } = useCryptoStore();

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  if (isError && error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!coins || coins.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhuma moeda encontrada.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border z-10">
      <Table className="z-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Moeda</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">1h</TableHead>
            <TableHead className="text-right">24h</TableHead>
            <TableHead className="text-right">7d</TableHead>
            <TableHead className="text-right">Volume 24h</TableHead>
            <TableHead className="text-right">Cap. Mercado</TableHead>
            <TableHead className="text-right w-32">Últimos 7 dias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(coin.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        favorites.includes(coin.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  {coin.market_cap_rank}
                </div>
              </TableCell>
              <TableCell>
                <Link
                  href={`/coin/${coin.id}`}
                  className="flex items-center gap-3 hover:underline"
                >
                  <Image
                    src={coin.image || '/placeholder.svg'}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(coin.current_price)}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    coin.price_change_percentage_24h > 0
                      ? 'default'
                      : 'destructive'
                  }
                  className="font-medium"
                >
                  {coin.price_change_percentage_24h > 0 ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {formatPercentage(coin.price_change_percentage_24h)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    coin.price_change_percentage_24h > 0
                      ? 'default'
                      : 'destructive'
                  }
                  className="font-medium"
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    coin.price_change_percentage_24h > 0
                      ? 'default'
                      : 'destructive'
                  }
                  className="font-medium"
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {formatMarketCap(coin.total_volume)}
              </TableCell>
              <TableCell className="text-right">
                {formatMarketCap(coin.market_cap)}
              </TableCell>
              <TableCell className="text-right">
                {coin.sparkline_in_7d?.price && (
                  <Sparkline data={coin.sparkline_in_7d.price} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
