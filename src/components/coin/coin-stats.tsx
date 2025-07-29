'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Clock,
  Target,
} from 'lucide-react';
import {
  formatCurrency,
  formatPercentage,
  formatNumber,
  formatMarketCap,
} from '@/lib/utils';
import type { CoinDetail } from '@/types/coin';

interface CoinStatsProps {
  coin: CoinDetail;
}

export function CoinStats({ coin }: CoinStatsProps) {
  const safeNumber = (value: any, fallback = 0) => {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  const currentPrice = safeNumber(
    coin.market_data?.current_price?.usd || coin.current_price,
  );
  const marketCap = safeNumber(
    coin.market_data?.market_cap?.usd || coin.market_cap,
  );
  const volume24h = safeNumber(
    coin.market_data?.total_volume?.usd || coin.total_volume,
  );
  const circulatingSupply = safeNumber(coin.circulating_supply);
  const totalSupply = safeNumber(coin.total_supply);
  const maxSupply = safeNumber(coin.max_supply);
  const ath = safeNumber(coin.ath);
  const atl = safeNumber(coin.atl);
  const athChange = safeNumber(coin.ath_change_percentage);
  const atlChange = safeNumber(coin.atl_change_percentage);

  const stats = [
    {
      title: 'Preço Atual',
      value: formatCurrency(currentPrice),
      icon: DollarSign,
      description: 'Preço em USD',
      highlight: true,
    },
    {
      title: 'Capitalização de Mercado',
      value: formatMarketCap(marketCap),
      icon: BarChart3,
      description: `Rank #${coin.market_cap_rank || 'N/A'}`,
      highlight: true,
    },
    {
      title: 'Volume 24h',
      value: formatMarketCap(volume24h),
      icon: TrendingUp,
      description: 'Volume de negociação',
    },
    {
      title: 'Fornecimento Circulante',
      value: `${formatNumber(circulatingSupply)} ${coin.symbol?.toUpperCase() || ''}`,
      icon: Target,
      description:
        totalSupply > 0
          ? `${((circulatingSupply / totalSupply) * 100).toFixed(1)}% do total`
          : 'Fornecimento total',
    },
    {
      title: 'Fornecimento Total',
      value:
        totalSupply > 0
          ? `${formatNumber(totalSupply)} ${coin.symbol?.toUpperCase() || ''}`
          : 'Não definido',
      icon: BarChart3,
      description:
        maxSupply > 0
          ? `Máximo: ${formatNumber(maxSupply)}`
          : 'Sem limite máximo',
    },
    {
      title: 'Máxima Histórica (ATH)',
      value: formatCurrency(ath),
      icon: TrendingUp,
      description: (
        <div className="flex items-center gap-1">
          {athChange > 0 ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
          <span className={athChange > 0 ? 'text-green-600' : 'text-red-600'}>
            {formatPercentage(athChange)} desde ATH
          </span>
        </div>
      ),
    },
    {
      title: 'Mínima Histórica (ATL)',
      value: formatCurrency(atl),
      icon: TrendingDown,
      description: (
        <div className="flex items-center gap-1">
          {atlChange > 0 ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
          <span className={atlChange > 0 ? 'text-green-600' : 'text-red-600'}>
            {formatPercentage(atlChange)} desde ATL
          </span>
        </div>
      ),
    },
    {
      title: 'Última Atualização',
      value: coin.last_updated
        ? new Date(coin.last_updated).toLocaleString('pt-BR')
        : 'N/A',
      icon: Clock,
      description: 'Dados atualizados',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={stat.highlight ? 'border-primary/20 bg-primary/5' : ''}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon
                className={`h-4 w-4 ${stat.highlight ? 'text-primary' : 'text-muted-foreground'}`}
              />
            </CardHeader>
            <CardContent>
              <div
                className={`text-xl font-bold ${stat.highlight ? 'text-primary' : ''}`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
