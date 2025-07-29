'use client';

import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Página não encontrada</CardTitle>
          <CardDescription>
            A página que você está procurando não existe ou foi movida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-6xl font-bold text-muted-foreground/20">404</div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>Possíveis causas:</p>
            <ul className="text-left list-disc list-inside space-y-1">
              <li>URL digitada incorretamente</li>
              <li>Link quebrado ou desatualizado</li>
              <li>Página removida ou movida</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Voltar ao início
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Página anterior
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
