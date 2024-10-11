import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonVideo() {
  return (
    <div className="flex items-center justify-center space-y-3">
      <Skeleton className="h-[50vh] w-screen rounded-xl" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="grid w-full grid-rows-2 gap-5 md:gap-20 lg:grid lg:h-[500px] lg:grid-cols-2 lg:grid-rows-none">
      {/* Image Skeleton */}
      <div className="relative flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      {/* Product Info Skeleton */}
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="h-4 w-72" /> {/* Title */}
          <Skeleton className="h-2 w-72" /> {/* Description*/}
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-32" /> {/* Value */}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-32" /> {/* Value */}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-32" /> {/* Value */}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-32" /> {/* Value */}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-32" /> {/* Value */}
          </div>
        </div>

        {/* Stock Skeleton */}
        <div className="flex items-center gap-5 self-end">
          <Skeleton className="h-4 w-36" /> {/* Stock Info */}
        </div>
        {/* Price and Quantity Selector Skeleton */}
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-24" /> {/* Price */}
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Quantity - */}
            <Skeleton className="h-10 w-10 rounded-xl" />
            {/* Quantity Number */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Quantity + */}
          </div>
        </div>
        {/* Price and Quantity Selector Skeleton */}
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-24" /> {/* Price */}
          <div className="flex items-center">
            {/* Quantity Number */}
            <Skeleton className="h-10 w-10 rounded-lg" /> {/* Quantity + */}
          </div>
        </div>
      </div>
    </div>
  );
}
