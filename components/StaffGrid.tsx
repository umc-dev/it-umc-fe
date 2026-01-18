"use client";

import type { Dosen } from "@/types/dosen"; // Pastikan path interface Dosen benar
import Image from "next/image";
import { ExternalLink, GraduationCap, Microscope } from "lucide-react";
import { SkeletonStaffCard } from "@/components/skeletons/skeleton-staff-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface StaffGridProps {
  members: Dosen[];
  isLoading?: boolean;
}

export default function StaffGrid({
  members,
  isLoading = false,
}: StaffGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading
        ? Array.from({ length: SKELETON_COUNTS.STAFF }).map((_, i) => (
            <SkeletonStaffCard key={i} />
          ))
        : members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-accent group"
            >
              {/* Image Section */}
              <div className="relative w-full h-72 bg-muted overflow-hidden">
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
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent mb-6">
                  Dosen Program Studi
                </p>

                {/* Action Buttons (Link) */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                  <a
                    href={member.teaching}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-accent hover:text-white transition-all shadow-sm"
                  >
                    <GraduationCap size={14} />
                    Pengajaran
                  </a>
                  <a
                    href={member.research}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-accent hover:text-white transition-all shadow-sm"
                  >
                    <Microscope size={14} />
                    Pengabdian
                  </a>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
