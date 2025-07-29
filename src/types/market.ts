export interface MarketData {
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface GlobalData {
  data: MarketData;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
  status?: number;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface CoinsParams extends PaginationParams {
  vs_currency?: string;
  ids?: string;
  category?: string;
  order?: string;
  sparkline?: boolean;
  price_change_percentage?: string;
}
