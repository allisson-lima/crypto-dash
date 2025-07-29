'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

interface CoinErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CoinError({ error, reset }: CoinErrorProps) {
  useEffect(() => {
    console.error('Coin Page Error:', error);
  }, [error]);

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('404') || error.message.includes('not found')) {
      return 'Esta criptomoeda não foi encontrada.';
    }
    if (error.message.includes('fetch')) {
      return 'Erro ao carregar dados da criptomoeda.';
    }
    if (error.message.includes('timeout')) {
      return 'A requisição demorou muito para responder.';
    }
    return 'Erro ao carregar detalhes da criptomoeda.';
  };

  const getErrorSuggestion = (error: Error) => {
    if (error.message.includes('404')) {
      return 'Verifique se o ID da moeda está correto ou procure por outra criptomoeda.';
    }
    if (error.message.includes('fetch') || error.message.includes('timeout')) {
      return 'Verifique sua conexão e tente novamente.';
    }
    return 'Tente recarregar a página ou volte para a lista de moedas.';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header simples */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-muted rounded animate-pulse" />
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
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
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Erro ao carregar moeda</CardTitle>
              <CardDescription>
                Não foi possível carregar os detalhes desta criptomoeda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{getErrorMessage(error)}</AlertDescription>
              </Alert>

              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <strong>Sugestão:</strong> {getErrorSuggestion(error)}
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Detalhes técnicos
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                    {error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-2 pt-2">
                <Button onClick={reset} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar novamente
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="flex-1 bg-transparent"
                >
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
