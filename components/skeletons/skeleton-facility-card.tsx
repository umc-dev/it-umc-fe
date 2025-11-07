export function SkeletonFacilityCard() {
  return (
    <div className="bg-white p-8 rounded-xl border border-border animate-pulse space-y-4">
      <div className="w-12 h-12 bg-muted rounded"></div>
      <div className="h-6 bg-muted rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
      </div>
    </div>
  )
}
