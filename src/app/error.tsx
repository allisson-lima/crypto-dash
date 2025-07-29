'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro para monitoramento
    console.error('Application Error:', error);
  }, [error]);

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('fetch')) {
      return 'Erro de conexão com a API. Verifique sua conexão com a internet.';
    }
    if (error.message.includes('timeout')) {
      return 'A requisição demorou muito para responder. Tente novamente.';
    }
    if (error.message.includes('404')) {
      return 'Recurso não encontrado.';
    }
    if (error.message.includes('401')) {
      return 'Erro de autenticação. Verifique as credenciais da API.';
    }
    if (error.message.includes('429')) {
      return 'Muitas requisições. Aguarde um momento antes de tentar novamente.';
    }
    return error.message || 'Ocorreu um erro inesperado.';
  };

  const getErrorSuggestion = (error: Error) => {
    if (error.message.includes('fetch') || error.message.includes('timeout')) {
      return 'Verifique sua conexão com a internet e tente novamente.';
    }
    if (error.message.includes('401')) {
      return 'Verifique se a API key do CoinGecko está configurada corretamente.';
    }
    if (error.message.includes('429')) {
      return 'Aguarde alguns minutos antes de fazer novas requisições.';
    }
    return 'Tente recarregar a página ou entre em contato com o suporte.';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Algo deu errado!</CardTitle>
          <CardDescription>
            Ocorreu um erro inesperado na aplicação.
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
                Detalhes técnicos (desenvolvimento)
              </summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                {error.stack}
              </pre>
              {error.digest && (
                <p className="mt-1 text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </details>
          )}

          <div className="flex gap-2 pt-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Ir para início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
