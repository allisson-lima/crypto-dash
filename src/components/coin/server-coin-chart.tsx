import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { formatCurrency, formatMarketCap } from '@/lib/utils';
import { AdvancedPriceChart } from './advanced-price-chart';
import { config } from '@/lib/config';

interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface ServerCoinChartProps {
  coinId: string;
  days?: number;
  interval?: '5m' | 'hourly' | 'daily';
}

async function getMarketChartData(
  coinId: string,
  days = 7,
  interval?: string,
): Promise<MarketChartData | null> {
  try {
    const params = new URLSearchParams({
      vs_currency: 'usd',
      days: days.toString(),
    });

    if (interval) {
      params.append('interval', interval);
    }

    const url = `${config.coingecko.baseUrl}/coins/${coinId}/market_chart?${params}`;

    console.log(`🚀 Fetching market chart data for ${coinId} (${days} days)`);

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        x_cg_demo_api_key: config.coingecko.apiKey!,
      },
      // Cache por 30 segundos (conforme documentação da API)
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      console.error(`❌ Failed to fetch market chart: ${response.status}`);
      return null;
    }

    const data = await response.json();

    console.log(
      `✅ Successfully fetched ${data.prices?.length || 0} price points`,
    );

    return data;
  } catch (error) {
    console.error('❌ Error fetching market chart data:', error);
    return null;
  }
}

// Função para calcular estatísticas dos dados
function calculateChartStats(data: MarketChartData) {
  if (!data.prices || data.prices.length === 0) return null;

  const prices = data.prices.map(([, price]) => price);
  const volumes = data.total_volumes.map(([, volume]) => volume);
  const marketCaps = data.market_caps.map(([, cap]) => cap);

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;

  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = (priceChange / firstPrice) * 100;

  return {
    firstPrice,
    lastPrice,
    minPrice,
    maxPrice,
    priceChange,
    priceChangePercent,
    avgVolume,
    currentMarketCap: marketCaps[marketCaps.length - 1],
    isPositive: priceChange >= 0,
  };
}

export async function ServerCoinChart({
  coinId,
  days = 7,
  interval,
}: ServerCoinChartProps) {
  const chartData = await getMarketChartData(coinId, days, interval);

  if (!chartData || !chartData.prices || chartData.prices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Gráfico de Preço ({days} dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Dados do gráfico não disponíveis</p>
              <p className="text-sm">Tente novamente mais tarde</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = calculateChartStats(chartData);

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Preço Atual</div>
              <div className="text-lg font-bold">
                {formatCurrency(stats.lastPrice)}
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {stats.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stats.priceChangePercent > 0 ? '+' : ''}
                {stats.priceChangePercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">
                Máxima ({days}d)
              </div>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(stats.maxPrice)}
              </div>
              <div className="text-sm text-muted-foreground">
                +
                {(
                  ((stats.maxPrice - stats.lastPrice) / stats.lastPrice) *
                  100
                ).toFixed(2)}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">
                Mínima ({days}d)
              </div>
              <div className="text-lg font-bold text-red-600">
                {formatCurrency(stats.minPrice)}
              </div>
              <div className="text-sm text-muted-foreground">
                {(
                  ((stats.minPrice - stats.lastPrice) / stats.lastPrice) *
                  100
                ).toFixed(2)}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Volume Médio</div>
              <div className="text-lg font-bold">
                {formatMarketCap(stats.avgVolume)}
              </div>
              <div className="text-sm text-muted-foreground">
                Últimos {days} dias
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Gráfico de Preço ({days} dias)
            <span className="text-sm font-normal text-muted-foreground ml-auto">
              Dados carregados no servidor • Atualizado a cada 30s
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <AdvancedPriceChart data={chartData} days={days} height={400} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
