'use client';

import { Search, ArrowLeft, Home, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Header } from '../header';

interface CoinNotFoundProps {
  coinId?: string;
}

export function CoinNotFound({ coinId }: CoinNotFoundProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para lista
          </Link>
        </Button>

        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">
                Criptomoeda não encontrada
              </CardTitle>
              <CardDescription>
                A criptomoeda que você está procurando não existe ou não está
                disponível no momento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-8xl font-bold text-muted-foreground/20">
                404
              </div>

              {coinId && (
                <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                  <div className="font-medium mb-1">🔍 ID procurado:</div>
                  <code className="bg-background px-2 py-1 rounded text-xs font-mono">
                    {coinId}
                  </code>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-3">
                <p className="font-medium">Possíveis causas:</p>
                <ul className="text-left list-disc list-inside space-y-1 max-w-sm mx-auto">
                  <li>ID da criptomoeda digitado incorretamente</li>
                  <li>Moeda removida ou descontinuada</li>
                  <li>Link desatualizado ou quebrado</li>
                  <li>Moeda temporariamente indisponível</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button asChild size="lg">
                  <Link href="/">
                    <Coins className="h-5 w-5 mr-2" />
                    Ver todas as criptomoedas
                  </Link>
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Página inicial
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Página anterior
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-6 border-t space-y-2">
                <p>
                  💡 <strong>Dica:</strong> Use a busca na página inicial para
                  encontrar a criptomoeda desejada.
                </p>
                <p>
                  🔄 Os dados são atualizados regularmente. Tente novamente mais
                  tarde.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
