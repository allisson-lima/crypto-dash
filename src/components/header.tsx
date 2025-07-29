'use client';

import { TrendingUp } from 'lucide-react';
import { SearchBar } from './search-bar';
import { ThemeToggle } from './theme-toggle';
import { formatCurrency } from '@/lib/utils';
import { useGlobal } from '@/services/hooks/use-global';

export function Header() {
  const { data: globalData } = useGlobal();

  const marketCap = globalData?.data?.total_market_cap?.usd;
  const marketCapChange =
    globalData?.data?.market_cap_change_percentage_24h_usd;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">CryptoDash</h1>
            </div>
            {marketCap && (
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Cap. Global: </span>
                  <span className="font-medium">
                    {formatCurrency(marketCap)}
                  </span>
                </div>
                {marketCapChange && (
                  <div
                    className={`font-medium ${
                      marketCapChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {marketCapChange > 0 ? '+' : ''}
                    {marketCapChange.toFixed(2)}%
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between sm:justify-end items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-4 sm:mt-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
