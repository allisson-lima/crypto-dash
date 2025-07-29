export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: any;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
}

export interface CoinDetail extends Coin {
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  market_data: {
    [x: string]: any;
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    sparkline_7d?: {
      price: number[];
    };
  };
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface SearchResponse {
  coins: CoinSearchResult[];
  exchanges: any[];
  icos: any[];
  categories: any[];
  nfts: any[];
}
