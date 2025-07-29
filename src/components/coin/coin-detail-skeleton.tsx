import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CoinDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-64 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" disabled>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para lista
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-10 w-48 rounded" />
                  <Skeleton className="h-8 w-16 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <Skeleton className="h-16 w-64 rounded" />
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-48 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <Skeleton className="h-[300px] w-full rounded" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-40 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto mb-2 rounded" />
                  <Skeleton className="h-8 w-full rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-4 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-24 mb-2 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
            <div className="mt-6 pt-4 border-t">
              <Skeleton className="h-10 w-48 rounded" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
