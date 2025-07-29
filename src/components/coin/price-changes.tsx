'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';
import type { CoinDetail } from '@/types/coin';

interface PriceChangesProps {
  coin: CoinDetail;
}

export function PriceChanges({ coin }: PriceChangesProps) {
  const safePercentage = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const changes = [
    {
      period: '1h',
      value: safePercentage(
        coin.market_data?.price_change_percentage_1h_in_currency?.usd || 0,
      ),
    },
    {
      period: '24h',
      value: safePercentage(
        coin.market_data?.price_change_percentage_24h ||
          coin.price_change_percentage_24h ||
          0,
      ),
    },
    {
      period: '7d',
      value: safePercentage(coin.market_data?.price_change_percentage_7d || 0),
    },
    {
      period: '14d',
      value: safePercentage(coin.market_data?.price_change_percentage_14d || 0),
    },
    {
      period: '30d',
      value: safePercentage(coin.market_data?.price_change_percentage_30d || 0),
    },
    {
      period: '1y',
      value: safePercentage(coin.market_data?.price_change_percentage_1y || 0),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Mudanças de Preço
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {changes.map((change) => (
            <div key={change.period} className="text-center">
              <div className="text-sm text-muted-foreground mb-1">
                {change.period}
              </div>
              <Badge
                variant={change.value >= 0 ? 'default' : 'destructive'}
                className="w-full justify-center font-medium"
              >
                {change.value >= 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {formatPercentage(change.value)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
