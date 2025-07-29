import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  Globe,
  ExternalLink,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { ServerCoinChart } from '@/components/coin/server-coin-chart';
import { PriceChanges } from '@/components/coin/price-changes';
import { CoinStats } from '@/components/coin/coin-stats';
import { config } from '@/lib/config';
import { Header } from '@/components/header';

async function getCoinData(id: string) {
  try {
    const response = await fetch(
      `${config.coingecko.baseUrl}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
      {
        headers: {
          accept: 'application/json',
          x_cg_demo_api_key: config.coingecko.apiKey!,
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded api - please try again later');
      }
      throw new Error('Failed to fetch coin data');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching coin ${id}:`, error);
    throw error;
  }
}

interface CoinPageProps {
  params: Promise<{ id: string }>;
}

// Loading component para o gráfico
function ChartSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default async function CoinPage({ params }: CoinPageProps) {
  const { id } = await params;

  const coinData = await getCoinData(id);

  const currentPrice =
    coinData.market_data?.current_price?.usd || coinData.current_price || 0;
  const priceChange24h =
    coinData.market_data?.price_change_percentage_24h ||
    coinData.price_change_percentage_24h ||
    0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para lista
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Image
                src={
                  coinData.image?.large ||
                  coinData.image ||
                  '/placeholder.svg?height=64&width=64'
                }
                alt={coinData.name || 'Coin'}
                width={64}
                height={64}
                className="rounded-full ring-2 ring-border"
              />
              {coinData.market_cap_rank && coinData.market_cap_rank <= 10 && (
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {coinData.market_cap_rank}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {coinData.name}
                </h1>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {coinData.symbol?.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Rank #{coinData.market_cap_rank || 'N/A'}</span>
                <span>•</span>
                <span className="text-green-600 font-medium">
                  Dados carregados no servidor
                </span>
                {coinData.links?.homepage?.[0] && (
                  <>
                    <span>•</span>
                    <a
                      href={coinData.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                )}
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

        <div className="mb-8">
          <Suspense fallback={<ChartSkeleton />}>
            <ServerCoinChart coinId={id} days={7} />
          </Suspense>
        </div>

        <div className="mb-8">
          <PriceChanges coin={coinData} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Estatísticas de Mercado</h2>
          <CoinStats coin={coinData} />
        </div>

        {coinData.description?.en && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Sobre {coinData.name}</h3>
              <div
                className="prose prose-sm max-w-none dark:prose-invert leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    coinData.description.en.split('. ').slice(0, 3).join('. ') +
                    '.',
                }}
              />
              {coinData.links?.homepage?.[0] && (
                <div className="mt-6 pt-4 border-t">
                  <Button asChild variant="outline">
                    <a
                      href={coinData.links.homepage[0]}
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
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CoinPageProps) {
  const { id } = await params;

  try {
    const coin = await getCoinData(id);
    const price = coin.market_data?.current_price?.usd || coin.current_price;

    return {
      title: `${coin.name} (${coin.symbol?.toUpperCase()}) - CryptoDash`,
      description: `Acompanhe ${coin.name} com gráficos históricos, estatísticas e dados em tempo real. Preço atual: ${formatCurrency(price)}`,
      openGraph: {
        title: `${coin.name} - Gráficos e Análise`,
        description: `Preço: ${formatCurrency(price)} • Dados históricos • Análise completa`,
        images: [coin.image?.large || coin.image],
      },
    };
  } catch {
    return {
      title: 'Criptomoeda - CryptoDash',
      description: 'Análise completa de criptomoedas com gráficos históricos',
    };
  }
}
