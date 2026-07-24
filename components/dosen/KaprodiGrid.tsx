import type { Dosen, DosenPosition } from "@/types/dosen";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Microscope, BookOpen } from "lucide-react";

interface KaprodiHistoryItem {
  id: string;
  dosen: Dosen;
  position: DosenPosition;
}

interface KaprodiGridProps {
  historyItems: KaprodiHistoryItem[];
  isLoading?: boolean;
}

export default function KaprodiGrid({
  historyItems,
  isLoading = false,
}: KaprodiGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-96"></div>
        ))}
      </div>
    );
  }

  const isSmallCount = historyItems.length > 0 && historyItems.length <= 2;

  return (
    <div
      className={
        isSmallCount
          ? "flex flex-col sm:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      }
    >
      {historyItems.map((item, index) => {
        const { dosen, position } = item;

        const startYear = new Date(position.startDate).getFullYear();
        const endYear = position.endDate
          ? new Date(position.endDate).getFullYear()
          : "Sekarang";

        const isCurrent = !position.endDate;

        return (
          <div
            key={`${dosen.id}-${position.id}-${index}`}
            className={`bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden border border-slate-200/80 hover:border-slate-300 flex flex-col group ${
              isSmallCount ? "w-full sm:w-[360px] lg:w-[380px]" : ""
            }`}
          >
            {/* Period Banner */}
            <div className="p-3 text-center font-semibold text-xs tracking-wider uppercase bg-slate-50 text-slate-600 border-b border-slate-200/80">
              Periode {startYear} - {endYear}
            </div>

            <Link href={`/dosen/${dosen.id}`} className="flex flex-col flex-1">
              <div className="relative w-full aspect-4/5 bg-slate-100 overflow-hidden">
                <Image
                  src={dosen.photo || "/placeholder.svg"}
                  alt={dosen.name}
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end gap-2 pointer-events-none">
                  <span className="bg-slate-900/85 text-white text-[11px] font-medium tracking-wide px-3 py-1 rounded-full backdrop-blur-xs shadow-xs line-clamp-1">
                    {dosen.expertise}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                  {dosen.name}
                </h3>

                {dosen.education && (
                  <div className="flex items-start gap-2 mt-1 mb-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{dosen.education}</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Footer Actions */}
            <div className="p-5 pt-0 mt-auto flex flex-col gap-3">
              <Link
                href={`/dosen/${dosen.id}`}
                className="w-full text-center py-2 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-primary transition-colors block shadow-xs"
              >
                Lihat Profil & Tridharma
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={dosen.teaching}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  <BookOpen size={14} className="text-slate-500" />
                  <span>Buku Ajar</span>
                </a>
                <a
                  href={dosen.research}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-primary transition-colors"
                >
                  <Microscope size={14} className="text-slate-500" />
                  <span>Riset</span>
                </a>
              </div>

              {/* NIDN */}
              {dosen.nidn && (
                <p className="pt-0.5 text-center text-[11px] text-slate-400 font-mono tracking-wider">
                  NIDN {dosen.nidn}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
