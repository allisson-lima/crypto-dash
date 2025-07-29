import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function LoadingSkeleton() {
  return (
    <div className="rounded-md border" id="skeleton-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Moeda</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">1h</TableHead>
            <TableHead className="text-right">24h</TableHead>
            <TableHead className="text-right">7d</TableHead>
            <TableHead className="text-right">Volume 24h</TableHead>
            <TableHead className="text-right">Cap. Mercado</TableHead>
            <TableHead className="text-right w-32">Últimos 7 dias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-8" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-12 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-12 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-12 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-24 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
