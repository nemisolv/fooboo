import { Skeleton } from '@/components/ui/skeleton';

export default function PostItemSkeleton() {
  return (
    <div className="flex flex-col space-y-3  p-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <Skeleton className="h-[225px] w-full rounded-xl" />
    
  </div>
  );
}
