import { LoadingSkeleton } from '@/components/loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-muted animate-pulse rounded" />
                <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-64 bg-muted animate-pulse rounded" />
              <div className="h-10 w-10 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-64 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        </div>

        <LoadingSkeleton />
      </main>
    </div>
  );
}
