"use client";

import { Trophy, CalendarDays, ExternalLink, Award, FileText } from "lucide-react";
import type { Achievement } from "@/types/achievement";
import Link from "next/link";

interface PrestasiGridProps {
  achievements: Achievement[];
}

export default function PrestasiGrid({ achievements }: PrestasiGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Heuristik sederhana: Jika link mengandung kata berita/news, tampilkan icon berita. 
  // Jika tidak, asumsikan itu sertifikat/dokumen
  const getLinkType = (url: string) => {
    const isUrlNews = url.toLowerCase().includes('berita') || url.toLowerCase().includes('news');
    return isUrlNews ? {
      icon: <FileText size={16} className="mr-2" strokeWidth={2} />,
      label: "Baca Berita Pencapaian"
    } : {
      icon: <Award size={16} className="mr-2" strokeWidth={2} />,
      label: "Lihat Sertifikat / Bukti"
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {achievements.map((item) => {
        const linkInfo = item.link && item.link !== "-" ? getLinkType(item.link) : null;
        
        return (
          <div 
            key={item.id}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Top Accent Bar - Memberi sentuhan elegan tapi tetap berwarna */}
            <div className="h-1.5 w-full bg-primary/20 group-hover:bg-primary transition-colors duration-300"></div>

            <div className="p-6 lg:p-7 flex flex-col flex-1">
              {/* Header: Badge & Date */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-300 shadow-sm">
                  <Trophy size={24} strokeWidth={1.5} />
                </div>
                
                <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
                  <CalendarDays size={14} className="mr-1.5 text-primary/70" strokeWidth={2} />
                  {formatDate(item.achievedAt)}
                </div>
              </div>

              {/* Tittle & Description */}
              <h3 className="text-xl font-bold text-slate-800 leading-snug mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                {item.achievementName}
              </h3>
              
              <div className="inline-flex items-center mt-1 mb-6">
                <span className="text-sm font-medium text-slate-500 mr-1.5">Diraih oleh:</span>
                <span className="text-sm font-bold text-slate-700 capitalize bg-slate-100 px-2 py-0.5 rounded-md">
                  {item.name}
                </span>
              </div>

              {/* Action Area / Footer */}
              <div className="mt-auto pt-5 border-t border-slate-100">
                {linkInfo ? (
                  <Link 
                    href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2.5 px-4 bg-slate-50 hover:bg-primary hover:text-white rounded-xl text-sm font-semibold text-primary transition-all duration-300 border border-slate-200 group-hover:border-transparent group-hover:shadow-md"
                  >
                    {linkInfo.icon}
                    {linkInfo.label}
                    <ExternalLink size={14} className="ml-2 opacity-50" strokeWidth={2} />
                  </Link>
                ) : (
                  <div className="flex items-center justify-center w-full py-2.5 px-4 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <span className="text-sm font-medium text-slate-400 flex items-center">
                      <Trophy size={14} className="mr-2 opacity-50" />
                      Prestasi Tercatat Internal
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
