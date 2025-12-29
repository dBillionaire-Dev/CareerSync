import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard = () => (
  <Card className="p-5 border-border/50">
    <div className="flex items-start gap-4">
      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  </Card>
);

export const SkeletonTable = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 border border-border/30 rounded-lg">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-48 flex-1" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);

export const SkeletonKanban = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="rounded-xl border border-border/50 bg-muted/30 p-3">
        <Skeleton className="h-6 w-24 mb-3" />
        <div className="space-y-2">
          {[...Array(3)].map((_, j) => (
            <Card key={j} className="p-3 border-border/50">
              <div className="flex gap-2">
                <Skeleton className="w-7 h-7 rounded-md" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);
