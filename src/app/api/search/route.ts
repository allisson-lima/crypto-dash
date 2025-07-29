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
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long' },
        { status: 400 },
      );
    }

    const response = await coinGeckoClient.get('/search', {
      params: { query: query.trim() },
    });

    // Limitar resultados para melhor performance
    const limitedResults = {
      ...response.data,
      coins: response.data.coins?.slice(0, 10) || [],
    };

    return NextResponse.json(limitedResults, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error searching coins:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error || error.message;

      return NextResponse.json(
        { error: 'Failed to search coins', details: message },
        { status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
