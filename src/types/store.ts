export interface CryptoState {
  // Coins data
  coins: Coin[];
  selectedCoin: CoinDetail | null;

  // UI state
  loading: boolean;
  error: string | null;

  // Search & filters
  searchQuery: string;
  searchResults: CoinSearchResult[];

  // User preferences
  favorites: string[];
  currency: string;
  theme: 'light' | 'dark' | 'system';

  // Pagination
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface CryptoActions {
  // Coins actions
  setCoins: (coins: Coin[]) => void;
  setSelectedCoin: (coin: CoinDetail | null) => void;

  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Search actions
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: CoinSearchResult[]) => void;
  clearSearch: () => void;

  // User preferences actions
  toggleFavorite: (coinId: string) => void;
  setCurrency: (currency: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Pagination actions
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;

  // Reset actions
  reset: () => void;
}

export type CryptoStore = CryptoState & CryptoActions;

import type { Coin, CoinDetail, CoinSearchResult } from './coin';
