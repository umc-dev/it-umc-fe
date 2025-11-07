export function SkeletonNewsCard() {
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-sm border border-border animate-pulse">
      <div className="relative h-48 bg-muted"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-6 bg-muted rounded w-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-4/5"></div>
        </div>
        <div className="h-4 bg-muted rounded w-1/3"></div>
      </div>
    </article>
  )
}
