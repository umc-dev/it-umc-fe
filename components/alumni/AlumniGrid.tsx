"use client";

import type { Alumni } from "@/types/alumni";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, PlayCircle, Quote, User } from "lucide-react";
import { SkeletonCard } from "@/components/skeletons/skeleton-card"; 
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface AlumniGridProps {
  members: Alumni[];
  isLoading?: boolean;
}

export default function AlumniGrid({
  members,
  isLoading = false,
}: AlumniGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading
        ? Array.from({ length: SKELETON_COUNTS.STAFF || 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : members.map((member) => (
            <div
              key={member.id}
              className="bg-card rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-border hover:border-accent group flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-square bg-muted overflow-hidden">
                <Image
                  src={member.photo || "/teknisi-pria-dengan-tools.webp"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay Gradient for Text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Badge Year */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <GraduationCap size={12} />
                    Angkatan {member.year}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent mb-4">
                  Alumni Teknik Informatika
                </p>

                {/* Testimonial Snippet */}
                <div className="relative bg-muted/30 p-4 rounded-lg mb-4 grow">
                  <Quote className="absolute top-2 left-2 text-primary/10 w-6 h-6" />
                  <p className="text-sm text-muted-foreground italic line-clamp-3 relative z-10">
                    &quot;{member.message}&ldquo;
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-border">
                  {member.video ? (
                    <Link
                      href={member.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-sm group-hover:shadow-md"
                    >
                      <PlayCircle size={16} />
                      Tonton Video
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-muted-foreground bg-muted rounded-lg cursor-default">
                      <User size={16} />
                      Profil Alumni
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}