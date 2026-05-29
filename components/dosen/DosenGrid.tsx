"use client";

import type { Dosen } from "@/types/dosen";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Microscope, Sparkles } from "lucide-react";
import { SkeletonCard } from "@/components/skeletons/skeleton-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface DosenGridProps {
  members: Dosen[];
  isLoading?: boolean;
}

export default function DosenGrid({
  members,
  isLoading = false,
}: DosenGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading
        ? Array.from({ length: SKELETON_COUNTS.STAFF }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : members.map((member) => (
            <Link
              key={member.id}
              href={`/dosen/${member.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-accent group flex flex-col cursor-pointer"
            >
              <div className="relative w-full aspect-4/5 bg-muted overflow-hidden">
                <Image
                  src={member.photo || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Badge Expertise */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary/90 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                    {member.expertise}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent mb-4 line-clamp-1">
                  {(() => {
                    if (!member.positions || member.positions.length === 0) return "Tahun Tidak Tersedia";
                    const activePosition = member.positions.find((p) => !p.endDate);
                    const latestPosition = activePosition ?? member.positions[0];
                    if (latestPosition.startDate) {
                      const startYear = new Date(latestPosition.startDate).getFullYear();
                      const endYear = latestPosition.endDate
                        ? new Date(latestPosition.endDate).getFullYear()
                        : "sekarang";
                      return `${startYear} - ${endYear}`;
                    }
                    return "Tahun Tidak Tersedia";
                  })()}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2.5 pb-4 border-b border-border mb-3" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={`/dosen/${member.id}`}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold bg-primary text-white rounded-lg hover:bg-accent transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles size={14} />
                    Detail & Tridharma
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={member.teaching}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-2 py-2 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all shadow-sm"
                    >
                      <GraduationCap size={12} />
                      Buku Ajar
                    </a>
                    <a
                      href={member.research}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-2 py-2 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all shadow-sm"
                    >
                      <Microscope size={12} />
                      Riset
                    </a>
                  </div>
                </div>

                {/* NIDN */}
                {member.nidn && (
                  <p className="mt-auto text-center text-xs text-muted-foreground pt-1">
                    NIDN&nbsp;
                    <span className="font-mono font-semibold text-foreground/80 tracking-widest">
                      {member.nidn}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          ))}
    </div>
  );
}