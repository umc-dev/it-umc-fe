export function SkeletonStaffCard() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-border overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-muted"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="pt-4 border-t border-border space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
