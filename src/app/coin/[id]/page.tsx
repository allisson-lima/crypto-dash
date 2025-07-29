'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Star,
  ExternalLink,
  Globe,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useCryptoStore } from '@/store/crypto-store';
import { useCoinId } from '@/services/hooks/use-coin';
import { Header } from '@/components/header';
import { PriceChart } from '@/components/coin/price-chart';
import { PriceChanges } from '@/components/coin/price-changes';
import { CoinStats } from '@/components/coin/coin-stats';
import { CoinDetailSkeleton } from '@/components/coin/coin-detail-skeleton';
import { CoinDetailError } from '@/components/coin/coin-detail-error';
import { CoinNotFound } from '@/components/coin/coin-not-found';

interface CoinPageProps {
  params: Promise<{ id: string }>;
}

export default function CoinPage({ params }: CoinPageProps) {
  const { id } = use(params);
  const { favorites, toggleFavorite } = useCryptoStore();

  const { data: coin, isLoading, error, refetch } = useCoinId(id);

  if (isLoading) {
    return <CoinDetailSkeleton />;
  }

  if (error) {
    return <CoinDetailError error={error} coinId={id} onRetry={refetch} />;
  }

  if (!coin) {
    return <CoinNotFound coinId={id} />;
  }

  const isFavorite = favorites.includes(coin.id);

  const safeNumber = (value: any, fallback = 0) => {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  const currentPrice = safeNumber(
    coin.market_data?.current_price?.usd || coin.current_price,
  );
  const priceChange24h = safeNumber(
    coin.market_data?.price_change_percentage_24h ||
      coin.price_change_percentage_24h,
  );
  const sparklineData =
    coin.market_data?.sparkline_7d?.price || coin.sparkline_in_7d?.price;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para lista
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={
                    coin.image?.large ||
                    coin.image ||
                    '/placeholder.svg?height=64&width=64'
                  }
                  alt={coin.name || 'Coin'}
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=64&width=64';
                  }}
                />
                {coin.market_cap_rank && coin.market_cap_rank <= 10 && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {coin.market_cap_rank}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {coin.name}
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {coin.symbol?.toUpperCase()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(coin.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Star
                      className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                    />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Rank #{coin.market_cap_rank || 'N/A'}</span>
                  {coin.links?.homepage?.[0] && (
                    <a
                      href={coin.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {coin.links?.twitter_screen_name && (
                    <a
                      href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="text-4xl md:text-5xl font-bold">
              {formatCurrency(currentPrice)}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={priceChange24h >= 0 ? 'default' : 'destructive'}
                className="text-lg px-4 py-2"
              >
                {priceChange24h >= 0 ? (
                  <TrendingUp className="mr-2 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-2 h-4 w-4" />
                )}
                {formatPercentage(priceChange24h)} (24h)
              </Badge>
            </div>
          </div>
        </div>

        {sparklineData &&
          Array.isArray(sparklineData) &&
          sparklineData.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Gráfico de Preço (7 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  <PriceChart
                    data={sparklineData}
                    width={800}
                    height={300}
                    showGradient={true}
                    showGrid={true}
                    className="min-w-[600px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

        <div className="mb-8">
          <PriceChanges coin={coin} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Estatísticas de Mercado</h2>
          <CoinStats coin={coin} />
        </div>

        {coin.description?.en && (
          <Card>
            <CardHeader>
              <CardTitle>Sobre {coin.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none dark:prose-invert leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    coin.description.en.split('. ').slice(0, 3).join('. ') +
                    '.',
                }}
              />
              {coin.links?.homepage?.[0] && (
                <div className="mt-4 pt-4 border-t">
                  <Button asChild variant="outline">
                    <a
                      href={coin.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Visitar site oficial
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
