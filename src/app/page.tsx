'use client';

import { Header } from '@/components/header';
import { CoinsTable } from '@/components/coin/coins-table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCryptoStore } from '@/store/crypto-store';
import { useCoin } from '@/services/hooks/use-coin';

export default function HomePage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { searchQuery } = useCryptoStore();

  const {
    data: coins,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useCoin(page, searchQuery);

  const errorMessage =
    isError && error ? 'Erro ao carregar moedas' : 'Erro desconhecido';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : 'Top 20 Criptomoedas'}
            </h2>
            <p className="text-muted-foreground">
              Ordenado por capitalização de mercado
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`}
            />
            Atualizar
          </Button>
        </div>

        <CoinsTable
          coins={coins || []}
          isLoading={isLoading}
          isError={isError}
          error={errorMessage}
        />
      </div>
    </div>
  );
}
