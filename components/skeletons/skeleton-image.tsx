export function SkeletonImage({ width = "w-full", height = "h-64" }) {
  return <div className={`${width} ${height} bg-muted rounded-lg animate-pulse`}></div>
}
