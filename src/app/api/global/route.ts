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
    const response = await coinGeckoClient.get('/global');

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error fetching global data:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || error.message;

      return NextResponse.json(
        { error: 'Failed to fetch global data', details: message },
        { status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
