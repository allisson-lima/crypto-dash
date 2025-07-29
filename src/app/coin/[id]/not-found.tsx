'use client';

import { Coins, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function CoinNotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simples */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CryptoDash</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para lista
          </Link>
        </Button>

        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Moeda não encontrada</CardTitle>
              <CardDescription>
                A criptomoeda que você está procurando não existe ou não está
                disponível.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-6xl font-bold text-muted-foreground/20">
                404
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Possíveis causas:</strong>
                </p>
                <ul className="text-left list-disc list-inside space-y-1">
                  <li>ID da moeda digitado incorretamente</li>
                  <li>Moeda removida da API</li>
                  <li>Link desatualizado ou quebrado</li>
                  <li>Moeda temporariamente indisponível</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <Button asChild>
                  <Link href="/">
                    <Coins className="h-4 w-4 mr-2" />
                    Ver todas as moedas
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Página anterior
                </Button>
              </div>

              <div className="text-xs text-muted-foreground pt-4 border-t">
                <p>
                  💡 <strong>Dica:</strong> Use a busca na página inicial para
                  encontrar a moeda desejada.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
