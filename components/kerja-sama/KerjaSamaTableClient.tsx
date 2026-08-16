"use client";

import { DataTable, Column } from "@/components/DataTable";
import { CalendarDays, LinkIcon, FileText } from "lucide-react";
import type { Partnership } from "@/types/partnership";

interface KerjaSamaTableClientProps {
  data: Partnership[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default function KerjaSamaTableClient({
  data,
  totalPages,
  currentPage,
  totalItems,
}: KerjaSamaTableClientProps) {
  const columns: Column<Partnership>[] = [
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
      key: "photo",
      label: "Logo",
      render: (_, row: Partnership) => (
        <div className="relative w-12 h-12 bg-white rounded-md border border-slate-200 flex items-center justify-center p-1.5 overflow-hidden shrink-0">
          {row.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={row.photo} 
              alt={`Logo ${row.name}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <LinkIcon className="w-5 h-5 text-slate-300" />
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Nama Mitra & Deskripsi",
      render: (_, row: Partnership) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 capitalize leading-snug">{row.name}</span>
          {row.description && (
            <span className="text-xs text-slate-500 line-clamp-2 mt-0.5">{row.description}</span>
          )}
        </div>
      ),
    },
    {
      key: "period",
      label: "Periode Kerja Sama",
      render: (_, row: Partnership) => {
        const start = new Date(row.startDate).getFullYear();
        const end = new Date(row.endDate).getFullYear();
        const label = start === end ? `${start}` : `${start} - ${end}`;
        
        return (
          <div className="flex items-center text-slate-600 whitespace-nowrap">
            <CalendarDays className="w-4 h-4 mr-2 text-primary/60" />
            <span className="font-medium">{label}</span>
          </div>
        );
      },
    },
    {
      key: "files",
      label: "Dokumen MOU/MOA",
      render: (_, row: Partnership) => (
        <div className="flex flex-col gap-1">
          {row.files && row.files.length > 0 ? (
            row.files.map((file) => (
              <a
                key={file.id}
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline truncate max-w-[180px]"
                title={file.fileName}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.fileName}</span>
              </a>
            ))
          ) : (
            <span className="text-xs text-slate-400">-</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable 
      data={data}
      columns={columns}
      totalPages={totalPages}
      currentPage={currentPage}
      totalItems={totalItems}
      searchPlaceholder="Cari nama mitra atau institusi kerja sama..."
      emptyMessage="Data kerja sama tidak ditemukan."
    />
  );
}
