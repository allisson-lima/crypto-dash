import { config } from '@/lib/config';
import axios from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

const coinGeckoClient = axios.create({
  baseURL: config.coingecko.baseUrl,
  headers: {
    accept: 'application/json',
    x_cg_demo_api_key: config.coingecko.apiKey,
  },
  timeout: 10000,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Coin ID is required' },
        { status: 400 },
      );
    }

    const queryParams = {
      localization: 'true',
      tickers: 'true',
      market_data: 'true',
      community_data: 'false',
      developer_data: 'false',
      sparkline: 'true',
    };

    const response = await coinGeckoClient.get(`/coins/${id}`, {
      params: queryParams,
    });

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error(
      `Error fetching coin ${await params.then((p) => p.id)}:`,
      error,
    );

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || error.message;

      if (status === 404) {
        return NextResponse.json({ error: 'Coin not found' }, { status: 404 });
      }

      return NextResponse.json(
        { error: 'Failed to fetch coin details', details: message },
        { status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
