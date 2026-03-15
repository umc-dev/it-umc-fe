export function SkeletonAchievementCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="h-1.5 w-full bg-slate-200"></div>
      <div className="p-7 space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
          <div className="h-6 bg-slate-100 rounded-full w-24"></div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-slate-100 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-2/3"></div>
        </div>
        <div className="pt-5 border-t border-slate-100">
          <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
