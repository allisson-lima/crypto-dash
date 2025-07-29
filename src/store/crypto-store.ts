import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CryptoStore } from '@/types/store';
import type { Coin, CoinDetail, CoinSearchResult } from '@/types/coin';

const initialState = {
  coins: [],
  selectedCoin: null,
  loading: false,
  error: null,
  searchQuery: '',
  searchResults: [],
  favorites: [],
  currency: 'usd',
  theme: 'system' as const,
  currentPage: 1,
  totalPages: 1,
  perPage: 20,
};

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCoins: (coins: Coin[]) => set({ coins, error: null }),
      setSelectedCoin: (coin: CoinDetail | null) => set({ selectedCoin: coin }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error, loading: false }),
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      setSearchResults: (searchResults: CoinSearchResult[]) =>
        set({ searchResults }),
      clearSearch: () =>
        set({
          searchQuery: '',
          searchResults: [],
          currentPage: 1,
        }),
      toggleFavorite: (coinId: string) => {
        const { favorites } = get();
        const newFavorites = favorites.includes(coinId)
          ? favorites.filter((id) => id !== coinId)
          : [...favorites, coinId];

        set({ favorites: newFavorites });
      },
      setCurrency: (currency: string) => set({ currency }),
      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
      setCurrentPage: (currentPage: number) => set({ currentPage }),
      setPerPage: (perPage: number) => set({ perPage, currentPage: 1 }),
      reset: () => set(initialState),
    }),
    {
      name: 'crypto-store',
      storage: createJSONStorage(() => localStorage),
      // Apenas persistir preferências do usuário
      partialize: (state) => ({
        favorites: state.favorites,
        currency: state.currency,
        theme: state.theme,
        perPage: state.perPage,
      }),
    },
  ),
);

export const useFavorites = () => useCryptoStore((state) => state.favorites);
export const useSearchQuery = () =>
  useCryptoStore((state) => state.searchQuery);
export const useCurrentPage = () =>
  useCryptoStore((state) => state.currentPage);
export const useTheme = () => useCryptoStore((state) => state.theme);
export const useCurrency = () => useCryptoStore((state) => state.currency);
