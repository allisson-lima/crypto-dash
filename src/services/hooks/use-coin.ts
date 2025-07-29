import { useQuery } from '@tanstack/react-query';
import { coinGeckoApi } from '../api';

/**
 * Hook para buscar a lista de moedas com suporte a paginação e pesquisa.
 *
 * Utiliza o React Query para fazer o cache e o revalidação dos dados com o CoinGecko.
 * Os dados são atualizados automaticamente a cada 30 segundos e considerados "frescos" por 15 segundos.
 *
 * @param page - Número da página atual (para paginação).
 * @param searchQuery - Texto de busca para filtrar moedas pelo nome ou símbolo.
 *
 * @returns Um objeto contendo os dados da query, estados de carregamento e funções auxiliares do React Query.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCoin(1, 'bitcoin');
 *
 * if (isLoading) return <p>Carregando...</p>;
 * if (error) return <p>Erro ao carregar dados</p>;
 *
 * return (
 *   <ul>
 *     {data?.map(coin => (
 *       <li key={coin.id}>{coin.name}</li>
 *     ))}
 *   </ul>
 * );
 * ```
 */

export function useCoin(page: number, searchQuery: string) {
  return useQuery({
    queryKey: ['coins', page, searchQuery],
    queryFn: () => coinGeckoApi.getCoins(page, 20, searchQuery || undefined),
    refetchInterval: 30000,
    staleTime: 15000,
    retry: (failureCount, error) => {
      // Não fazer retry para erros 4xx
      if (error instanceof Error && error.message.includes('400')) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function useCoinId(coinId: string) {
  return useQuery({
    queryKey: ['coin', coinId],
    queryFn: () => coinGeckoApi.getCoin(coinId),
    enabled: !!coinId,
  });
}
