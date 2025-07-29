'use client';

import { AlertCircle, RefreshCw, ArrowLeft, Search, Home } from 'lucide-react';
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
import { Header } from '../header';

interface CoinDetailErrorProps {
  error: unknown;
  coinId?: string;
  onRetry?: () => void;
}

export function CoinDetailError({
  error,
  coinId,
  onRetry,
}: CoinDetailErrorProps) {
  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      if (
        error.message.includes('404') ||
        error.message.includes('not found')
      ) {
        return `A criptomoeda "${coinId}" não foi encontrada.`;
      }
      if (error.message.includes('fetch')) {
        return 'Erro de conexão ao carregar dados da criptomoeda.';
      }
      if (error.message.includes('timeout')) {
        return 'A requisição demorou muito para responder.';
      }
      if (error.message.includes('401')) {
        return 'Erro de autenticação com a API.';
      }
      if (error.message.includes('429')) {
        return 'Muitas requisições. Aguarde um momento.';
      }
      return error.message;
    }
    return 'Erro desconhecido ao carregar dados da criptomoeda.';
  };

  const getErrorSuggestion = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return 'Verifique se o ID da moeda está correto ou procure por outra criptomoeda na lista principal.';
      }
      if (
        error.message.includes('fetch') ||
        error.message.includes('timeout')
      ) {
        return 'Verifique sua conexão com a internet e tente novamente.';
      }
      if (error.message.includes('401')) {
        return 'Verifique se a API key está configurada corretamente.';
      }
      if (error.message.includes('429')) {
        return 'Aguarde alguns minutos antes de fazer novas tentativas.';
      }
    }
    return 'Tente recarregar a página ou volte para a lista de criptomoedas.';
  };

  const isNotFoundError =
    error instanceof Error &&
    (error.message.includes('404') || error.message.includes('not found'));

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
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                {isNotFoundError ? (
                  <Search className="h-8 w-8 text-destructive" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-destructive" />
                )}
              </div>
              <CardTitle className="text-xl">
                {isNotFoundError
                  ? 'Criptomoeda não encontrada'
                  : 'Erro ao carregar dados'}
              </CardTitle>
              <CardDescription>
                {isNotFoundError
                  ? 'A criptomoeda que você está procurando não existe ou não está disponível.'
                  : 'Não foi possível carregar os detalhes desta criptomoeda.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{getErrorMessage(error)}</AlertDescription>
              </Alert>

              <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                <div className="font-medium mb-2">💡 Sugestão:</div>
                <p>{getErrorSuggestion(error)}</p>
              </div>

              {coinId && (
                <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                  <div className="font-medium mb-1">🔍 ID da moeda:</div>
                  <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs">
                    {coinId}
                  </code>
                </div>
              )}

              {process.env.NODE_ENV === 'development' &&
                error instanceof Error && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground mb-2">
                      Detalhes técnicos (desenvolvimento)
                    </summary>
                    <pre className="p-3 bg-muted rounded text-xs overflow-auto max-h-32 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </details>
                )}

              <div className="flex flex-col gap-2 pt-4">
                {onRetry && !isNotFoundError && (
                  <Button onClick={onRetry} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tentar novamente
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Início
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                </div>
              </div>

              {isNotFoundError && (
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Procure por outras criptomoedas:
                  </p>
                  <Button asChild variant="secondary">
                    <Link href="/">
                      <Search className="h-4 w-4 mr-2" />
                      Ver todas as moedas
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
