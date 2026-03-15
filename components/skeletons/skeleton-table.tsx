export function SkeletonTable() {
  return (
    <div className="space-y-6">
      <div className="w-full max-w-md h-11 bg-slate-200 animate-pulse rounded-xl"></div>
      
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="w-12 h-6 bg-slate-200 animate-pulse rounded"></div>
          <div className="w-40 h-6 bg-slate-200 animate-pulse rounded"></div>
          <div className="w-32 h-6 bg-slate-200 animate-pulse rounded ml-auto"></div>
          <div className="w-32 h-6 bg-slate-200 animate-pulse rounded"></div>
        </div>
        
        {/* Fake list of skeleton rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-6 border-b border-border/50 flex flex-col gap-3">
            <div className="w-3/4 h-5 bg-slate-200 animate-pulse rounded"></div>
            <div className="w-1/4 h-5 bg-slate-100 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center w-full mt-4">
          <div className="w-48 h-8 bg-slate-200 animate-pulse rounded-lg"></div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="w-10 h-10 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="w-10 h-10 bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
      </div>
    </div>
  );
}
