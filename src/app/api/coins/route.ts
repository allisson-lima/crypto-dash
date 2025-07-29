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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '20';
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: page,
      sparkline: 'true',
      price_change_percentage: '1h,24h,7d',
      ...(search && { ids: search }),
      ...(category && { category }),
    };

    const response = await coinGeckoClient.get('/coins/markets', { params });

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error fetching coins:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;

      return NextResponse.json(
        { error: 'Failed to fetch coins', details: message },
        { status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
