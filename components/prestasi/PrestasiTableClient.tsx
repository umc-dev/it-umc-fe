"use client";

import { DataTable, Column } from "@/components/DataTable";
import { ExternalLink, CalendarDays, Award, FileText } from "lucide-react";
import type { Achievement } from "@/types/achievement";

interface PrestasiTableClientProps {
  data: Achievement[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default function PrestasiTableClient({
  data,
  totalPages,
  currentPage,
  totalItems,
}: PrestasiTableClientProps) {
  // Define Columns inside the Client Component so functions can be passed to the Client-side DataTable safely
  const columns: Column<Achievement>[] = [
    {
      key: "no",
      label: "No",
      render: (_, __, index) => (
        <span className="font-semibold text-slate-500 whitespace-nowrap">
          {(currentPage - 1) * 10 + index + 1}
        </span>
      ),
    },
    {
      key: "name",
      label: "Nama Mahasiswa",
      render: (_, row: Achievement) => (
        <span className="font-semibold text-slate-700 capitalize">{row.name}</span>
      ),
    },
    {
      key: "achievementName",
      label: "Prestasi / Penghargaan",
      render: (_, row: Achievement) => (
        <span className="font-medium text-slate-800 line-clamp-2 leading-snug">{row.achievementName}</span>
      ),
    },
    {
      key: "achievedAt",
      label: "Tanggal Diraih",
      render: (_, row: Achievement) => (
        <div className="flex items-center text-slate-600 whitespace-nowrap">
          <CalendarDays className="w-4 h-4 mr-2 text-primary/60" />
          {new Date(row.achievedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      key: "link",
      label: "Referensi",
      render: (_, row: Achievement) => {
        const val = row.link;
        if (!val || val === "-") return <span className="text-muted-foreground italic text-xs">Internal / Tidak ada URL</span>;
        
        const isUrlNews = val.toLowerCase().includes('berita') || val.toLowerCase().includes('news');
        const icon = isUrlNews ? <FileText className="w-4 h-4 mr-1.5" /> : <Award className="w-4 h-4 mr-1.5" />;
        const label = isUrlNews ? "Baca Berita" : "Lihat Bukti";
        const href = val.startsWith('http') ? val : `https://${val}`;
        
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center px-3 py-1.5 bg-primary/5 text-primary rounded-lg hover:bg-primary transition-colors hover:text-white border border-primary/20 text-xs font-semibold whitespace-nowrap"
          >
            {icon}
            {label}
            <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
          </a>
        );
      }
    }
  ];

  return (
    <DataTable 
      data={data}
      columns={columns}
      totalPages={totalPages}
      currentPage={currentPage}
      totalItems={totalItems}
      searchPlaceholder="Cari nama peraih prestasi..."
      emptyMessage="Pencarian prestasi tidak ditemukan."
    />
  );
}
