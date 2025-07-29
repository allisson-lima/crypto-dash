/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { config } from '@/lib/config';
import { GlobalData } from '@/types/market';
import { coinGeckoApi } from '../api';

interface UseGlobalOptions
  extends Omit<UseQueryOptions<GlobalData>, 'queryKey' | 'queryFn'> {}

export const useGlobal = (options: UseGlobalOptions = {}) => {
  return useQuery({
    queryKey: ['global-data'],
    queryFn: coinGeckoApi.getGlobalData,
    staleTime: config.cache.global.staleTime,
    refetchInterval: config.cache.global.refetchInterval,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    ...options,
  });
};

export const useMarketCap = () => {
  const { data: globalData } = useGlobal();

  return {
    totalMarketCap: globalData?.data?.total_market_cap?.usd,
    marketCapChange: globalData?.data?.market_cap_change_percentage_24h_usd,
    totalVolume: globalData?.data?.total_volume?.usd,
    btcDominance: globalData?.data?.market_cap_percentage?.btc,
    ethDominance: globalData?.data?.market_cap_percentage?.eth,
  };
};
