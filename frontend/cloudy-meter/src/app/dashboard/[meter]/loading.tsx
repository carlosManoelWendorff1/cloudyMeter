"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  const skeletonCards = Array.from({ length: 5 });

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 min-h-screen">
      {skeletonCards.map((_, index) => (
        <Skeleton
          key={index}
          className={`h-full rounded-2xl
            ${
              index === 0 || index === 1
                ? "lg:col-span-3 md:col-span-2 sm:col-span-1"
                : "xl:col-span-2 lg:col-span-3 md:col-span-2 sm:col-span-1"
            }
          `}
        />
      ))}
    </div>
  );
}
