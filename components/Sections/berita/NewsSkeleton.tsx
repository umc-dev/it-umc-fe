import React from "react";

export function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
          {/* Image Placeholder */}
          <div className="aspect-video bg-muted animate-pulse" />

          <div className="p-5 space-y-4">
            {/* Title Placeholder */}
            <div className="space-y-2">
              <div className="h-6 w-full bg-muted animate-pulse rounded" />
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            </div>

            {/* Excerpt Placeholder */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted/60 animate-pulse rounded" />
              <div className="h-4 w-full bg-muted/60 animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-muted/60 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsSkeleton;
