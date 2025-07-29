/* eslint-disable @next/next/no-img-element */
'use client';

import type React from 'react';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Card } from '@/components/ui/card';
import { useSearchParams } from '@/hooks/use-search-params';
import { useCryptoStore } from '@/store/crypto-store';
import { coinGeckoApi } from '@/services/api';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export function SearchBar() {
  const { search, setSearch } = useSearchParams();
  const { setSearchQuery } = useCryptoStore();
  const [localSearch, setLocalSearch] = useState(search || '');
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search || '');
    }
  }, [search]);

  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => coinGeckoApi.searchCoins(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalSearch(value);

      if (value.length === 0) {
        setSearch(null);
        setSearchQuery('');
        setIsOpen(false);
      } else if (value.length >= 2) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [setSearch, setSearchQuery],
  );

  const handleInputFocus = useCallback(() => {
    if (localSearch.length >= 2) {
      setIsOpen(true);
    }
  }, [localSearch]);

  const handleSelectCoin = useCallback(
    (coinId: string, coinName: string) => {
      // setLocalSearch(coinName);
      // setSearch(coinId);
      // setSearchQuery(coinId);

      setIsOpen(false);

      inputRef.current?.blur();
    },
    [setSearch, setSearchQuery],
  );

  const clearSearch = useCallback(() => {
    setLocalSearch('');
    setSearch(null);
    setSearchQuery('');
    setIsOpen(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [setSearch, setSearchQuery]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && searchResults?.coins?.length) {
        const firstCoin = searchResults.coins[0];
        handleSelectCoin(firstCoin.id, firstCoin.name);
      }
    },
    [searchResults, handleSelectCoin],
  );

  return (
    <>
      <div ref={containerRef} className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            placeholder="Buscar criptomoedas..."
            value={localSearch}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10"
            autoComplete="off"
          />

          {isSearching && (
            <Loader2 className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground pointer-events-none" />
          )}

          {localSearch && !isSearching && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted"
              type="button"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Limpar busca</span>
            </Button>
          )}
        </div>
      </div>

      {isOpen &&
        containerRef.current &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] max-h-96 overflow-hidden shadow-lg"
            style={{
              top:
                containerRef.current.getBoundingClientRect().bottom +
                window.scrollY +
                4,
              left:
                containerRef.current.getBoundingClientRect().left +
                window.scrollX,
              width: containerRef.current.getBoundingClientRect().width,
            }}
          >
            <Card className="border bg-background/95 backdrop-blur-sm z-[9999]">
              <Command>
                <CommandList>
                  {isSearching ? (
                    <CommandEmpty>
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Buscando...
                      </div>
                    </CommandEmpty>
                  ) : searchResults?.coins?.length ? (
                    <CommandGroup heading="Criptomoedas" className="z-[9999]">
                      {searchResults.coins.slice(0, 8).map((coin: any) => (
                        <Link href={`/coin/${coin.id}`} key={coin.id}>
                          <CommandItem
                            value={coin.id}
                            onSelect={() =>
                              handleSelectCoin(coin.id, coin.name)
                            }
                            className="flex items-center gap-3 cursor-pointer p-3 hover:bg-muted/50"
                          >
                            <img
                              src={coin.large || coin.thumb}
                              alt={coin.name}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  '/placeholder.svg?height=32&width=32';
                              }}
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="font-medium truncate">
                                {coin.name}
                              </span>
                              <span className="text-sm text-muted-foreground uppercase">
                                {coin.symbol}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground flex-shrink-0">
                              #{coin.market_cap_rank || 'N/A'}
                            </div>
                          </CommandItem>
                        </Link>
                      ))}
                    </CommandGroup>
                  ) : (
                    <CommandEmpty className="py-6">
                      <div className="text-center">
                        <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Digite pelo menos 2 caracteres para buscar
                        </p>
                      </div>
                    </CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </Card>
          </div>,
          document.body,
        )}
    </>
  );
}
