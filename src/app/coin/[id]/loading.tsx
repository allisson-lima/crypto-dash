import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CoinLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
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
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-12 w-48 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24 rounded mb-2" />
                <Skeleton className="h-4 w-40 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
