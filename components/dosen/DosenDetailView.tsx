"use client";

import { useState } from "react";
import type { Dosen, DosenTridharma } from "@/types/dosen";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  Briefcase,
  Layers,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DosenDetailViewProps {
  dosen: Dosen;
}

type TabType = "PENGAJARAN" | "PENELITIAN" | "PENGABDIAN";

export default function DosenDetailView({ dosen }: DosenDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("PENGAJARAN");

  const tridharmas = dosen.dosenTridharmas || [];
  
  // Filter tridharma by active tab
  const filteredTridharmas = tridharmas
    .filter((t) => t.category === activeTab)
    .sort((a, b) => b.year - a.year);

  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case "PENGAJARAN":
        return <GraduationCap className="w-5 h-5" />;
      case "PENELITIAN":
        return <BookOpen className="w-5 h-5" />;
      case "PENGABDIAN":
        return <Users className="w-5 h-5" />;
    }
  };

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case "PENGAJARAN":
        return "Pengajaran";
      case "PENELITIAN":
        return "Penelitian";
      case "PENGABDIAN":
        return "Pengabdian Masyarakat";
    }
  };

  const getActivePosition = () => {
    if (!dosen.positions || dosen.positions.length === 0) return "Dosen";
    const activePosition = dosen.positions.find((p) => !p.endDate);
    return activePosition ? activePosition.lectureship.name : dosen.positions[0].lectureship.name;
  };

  const getPeriodString = () => {
    if (!dosen.positions || dosen.positions.length === 0) return "";
    const activePosition = dosen.positions.find((p) => !p.endDate);
    const latestPosition = activePosition ?? dosen.positions[0];
    if (latestPosition.startDate) {
      const startYear = new Date(latestPosition.startDate).getFullYear();
      const endYear = latestPosition.endDate
        ? new Date(latestPosition.endDate).getFullYear()
        : "Sekarang";
      return `${startYear} - ${endYear}`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <Link 
            href="/dosen" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Dosen
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Profile Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col transition-all duration-300">
            {/* Avatar container */}
            <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src={dosen.photo || "/placeholder.svg"}
                alt={dosen.name}
                fill
                className="object-cover"
                unoptimized
                sizes="160px"
              />
            </div>

            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-2 leading-tight">
                {dosen.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 text-accent text-xs font-semibold rounded-full mb-4">
                <Briefcase size={12} />
                {getActivePosition()}
              </div>

              {dosen.nidn && (
                <div className="bg-slate-50 rounded-xl p-3 mb-6 text-center max-w-xs mx-auto border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">NIDN</span>
                  <span className="font-mono text-sm font-semibold text-slate-700 tracking-wider">
                    {dosen.nidn}
                  </span>
                </div>
              )}
            </div>

            {/* Dosen Details Section */}
            <div className="space-y-5 text-sm mt-2 border-t border-slate-100 pt-5">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Keahlian & Spesialisasi
                </span>
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-md">
                  {dosen.expertise}
                </span>
              </div>

              {getPeriodString() && (
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                    Masa Jabatan
                  </span>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={14} className="text-accent" />
                    <span className="text-xs font-medium">{getPeriodString()}</span>
                  </div>
                </div>
              )}

              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Ringkasan Pengajaran
                </span>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{dosen.teaching || "Tidak tersedia"}"
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Fokus Penelitian
                </span>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{dosen.research || "Tidak tersedia"}"
                </p>
              </div>
            </div>
          </div>

          {/* Main Tridharma Content Area */}
          <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300">
            {/* Header Title */}
            <div className="p-6 md:p-8 pb-5 border-b border-slate-100">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2.5">
                <Layers className="text-primary w-5.5 h-5.5" />
                Catatan Tridharma Perguruan Tinggi
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Catatan publikasi, pengajaran, penelitian dan pengabdian masyarakat.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 md:px-8 bg-slate-50/50 border-b border-slate-100">
              <div className="flex gap-2 -mb-px overflow-x-auto no-scrollbar">
                {(["PENGAJARAN", "PENELITIAN", "PENGABDIAN"] as TabType[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center gap-2 py-4 px-4 text-sm font-semibold border-b-2 transition-all shrink-0 duration-300 cursor-pointer ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {getTabIcon(tab)}
                      {getTabLabel(tab)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tridharma List */}
            <div className="p-6 md:p-8 space-y-6">
              {filteredTridharmas.length > 0 ? (
                <div className="relative border-l-2 border-slate-100 pl-6 ml-2 space-y-8">
                  {filteredTridharmas.map((item, idx) => (
                    <div key={item.id || idx} className="relative group/item">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary group-hover/item:scale-125 transition-all duration-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>

                      {/* Content Card */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-accent/40 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Tahun {item.year}
                          </span>
                          
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline cursor-pointer"
                            >
                              Tautan Dokumen
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    {getTabIcon(activeTab)}
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-1">Belum Ada Riwayat</h3>
                  <p className="text-xs max-w-xs leading-relaxed">
                    Dosen yang bersangkutan belum memiliki data riwayat tridharma kategori {getTabLabel(activeTab).toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
