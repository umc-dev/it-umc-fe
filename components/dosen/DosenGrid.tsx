"use client";

import type { Dosen } from "@/types/dosen";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Microscope, BookOpen } from "lucide-react";
import { SkeletonCard } from "@/components/skeletons/skeleton-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface DosenGridProps {
  members: Dosen[];
  isLoading?: boolean;
  groupName?: string;
}

export default function DosenGrid({
  members,
  isLoading = false,
  groupName,
}: DosenGridProps) {
  const isSmallCount = !isLoading && members.length > 0 && members.length <= 2;

  return (
    <div
      className={
        isSmallCount
          ? "flex flex-col sm:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      }
    >
      {isLoading
        ? Array.from({ length: SKELETON_COUNTS.STAFF }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : members.map((member) => {
            const now = new Date();
            const activePos =
              member.positions?.find((p) => !p.endDate || new Date(p.endDate) >= now) ??
              member.positions?.[0];
            const positionName =
              groupName ?? activePos?.lectureship?.name ?? "Dosen Program Studi";

            return (
              <div
                key={member.id}
                className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group ${
                  isSmallCount ? "w-full sm:w-[360px] lg:w-[380px]" : ""
                }`}
              >
                <Link
                  href={`/dosen/${member.id}`}
                  className="flex flex-col flex-1"
                >
                  {/* Photo Section */}
                  <div className="relative w-full aspect-4/5 bg-slate-100 overflow-hidden">
                    <Image
                      src={member.photo || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end gap-2 pointer-events-none">
                      <span className="bg-slate-900/85 text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-full backdrop-blur-xs shadow-xs line-clamp-1">
                        {member.expertise}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                        {positionName}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>

                    {/* Education Field */}
                    {member.education && (
                      <div className="flex items-start gap-2 mt-1 mb-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{member.education}</span>
                      </div>
                    )}

                    {/* Description Snippet */}
                    {member.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-auto pt-2 border-t border-slate-100 leading-relaxed">
                        {member.description}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Action Footer */}
                <div className="p-5 pt-0 mt-auto flex flex-col gap-3">
                  <Link
                    href={`/dosen/${member.id}`}
                    className="w-full text-center py-2 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-primary transition-colors block shadow-xs"
                  >
                    Detail & Profil Tridharma
                  </Link>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={member.teaching}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"
                    >
                      <BookOpen size={14} className="text-slate-500" />
                      <span className="line-clamp-1">Buku Ajar</span>
                    </a>
                    <a
                      href={member.research}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"
                    >
                      <Microscope size={14} className="text-slate-500" />
                      <span className="line-clamp-1">Riset</span>
                    </a>
                  </div>

                  {/* NIDN */}
                  {member.nidn && (
                    <p className="text-center text-[11px] text-slate-400 font-mono tracking-wider pt-0.5">
                      NIDN {member.nidn}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
    </div>
  );
}
