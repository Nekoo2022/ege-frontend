import { Skeleton } from "@/components/ui/common/Skeleton";

export function TasksSkeleton() {
  return (
    <div className="px-10">
      <div className="flex items-center justify-between bg-card rounded-xl shadow-md mb-10 w-full h-20 p-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex gap-2 flex-1 justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-full" />
          ))}
        </div>
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[120px] rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
