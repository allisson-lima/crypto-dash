import { Coin, CoinDetail } from '@/types/coin';
import { apiClient } from './axios';
import { MarketData } from '@/types/market';

export const coinGeckoApi = {
  getCoins: async (
    page = 1,
    perPage = 20,
    search?: string,
    category?: string,
  ): Promise<Coin[]> => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    if (category) {
      params.append('category', category);
    }

    const response = await apiClient.get(`/coins?${params}`);
    return response.data;
  },

  getCoin: async (id: string): Promise<CoinDetail> => {
    const response = await apiClient.get(`/coins/${id}`);
    return response.data;
  },

  searchCoins: async (query: string) => {
    if (!query || query.trim().length < 2) {
      return { coins: [] };
    }

    const response = await apiClient.get('/search', {
      params: { q: query.trim() },
    });
    return response.data;
  },

  getGlobalData: async (): Promise<{ data: MarketData }> => {
    const response = await apiClient.get('/global');
    return response.data;
  },
};

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Erro desconhecido';
};
