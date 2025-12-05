import { Skeleton } from "@/components/ui/common/Skeleton";

export function HeaderSkeleton() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full h-20 bg-card border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-28" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>
    </header>
  );
}
