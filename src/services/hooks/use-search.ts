'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCryptoStore } from '@/store/crypto-store';
import { config } from '@/lib/config';
import { SearchResponse } from '@/types/coin';
import { coinGeckoApi } from '../api';

interface UseSearchOptions
  extends Omit<UseQueryOptions<SearchResponse>, 'queryKey' | 'queryFn'> {
  query?: string;
  minLength?: number;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { query: externalQuery, minLength = 2, ...queryOptions } = options;

  const searchQuery = useCryptoStore((state) => state.searchQuery);
  const finalQuery = externalQuery ?? searchQuery;

  const isValidQuery = useMemo(() => {
    return finalQuery && finalQuery.trim().length >= minLength;
  }, [finalQuery, minLength]);

  return useQuery({
    queryKey: ['search', finalQuery],
    queryFn: () => coinGeckoApi.searchCoins(finalQuery),
    enabled: Boolean(isValidQuery && queryOptions.enabled !== false),
    staleTime: config.cache.search.staleTime,
    retry: 2,
    ...queryOptions,
  });
};

export const useSearchSuggestions = (
  query: string,
  options: UseSearchOptions = {},
) => {
  return useSearch({
    query,
    minLength: 1,
    staleTime: 10 * 60 * 1000, // 10 minutos para sugestões
    ...options,
  });
};
