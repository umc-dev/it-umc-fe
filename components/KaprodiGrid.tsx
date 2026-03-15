import type { Dosen, DosenPosition } from "@/types/dosen";
import Image from "next/image";
import { GraduationCap, Microscope } from "lucide-react";

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
          <div key={i} className="animate-pulse bg-muted rounded-xl h-96"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {historyItems.map((item, index) => {
        const { dosen, position } = item;
        
        // Format year range
        const startYear = new Date(position.startDate).getFullYear();
        const endYear = position.endDate 
          ? new Date(position.endDate).getFullYear() 
          : "sekarang";
          
        const isCurrent = !position.endDate;

        return (
          <div
            key={`${dosen.id}-${position.id}-${index}`}
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border ${
              isCurrent ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
            } group flex flex-col`}
          >
            {/* Year Badge */}
            <div className={`p-3 text-center font-bold text-lg border-b ${
              isCurrent ? "bg-primary text-white" : "bg-slate-100 text-slate-700"
            }`}>
              Periode {startYear} - {endYear}
              {isCurrent && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full ring-1 ring-white/50 relative -top-0.5">Aktif</span>}
            </div>

            <div className="relative w-full aspect-4/5 bg-muted overflow-hidden">
              <Image
                src={dosen.photo || "/placeholder.svg"}
                alt={dosen.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500 object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary/90 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                  {dosen.expertise}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-primary mb-1 line-clamp-2">
                {dosen.name}
              </h3>
              
              <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <a
                  href={dosen.teaching}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-accent hover:text-white transition-all shadow-sm"
                >
                  <GraduationCap size={14} />
                  Pengajaran
                </a>
                <a
                  href={dosen.research}
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
        );
      })}
    </div>
  );
}
