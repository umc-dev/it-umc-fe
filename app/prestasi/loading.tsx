import { SkeletonAchievementCard } from "@/components/skeletons/skeleton-achievement-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

export default function Loading() {
  return (
    <div className="py-20 bg-background min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="h-10 bg-slate-100 rounded-lg w-48 mb-4 animate-pulse"></div>
          <div className="w-20 h-1.5 bg-slate-100 rounded-full mb-4 animate-pulse"></div>
          <div className="h-6 bg-slate-100 rounded-lg w-full max-w-xl animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: SKELETON_COUNTS.ACHIEVEMENTS }).map((_, i) => (
            <SkeletonAchievementCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
