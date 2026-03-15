"use client";

import { DataTable, Column } from "@/components/DataTable";
import { CalendarDays, LinkIcon } from "lucide-react";
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
  // Define Columns inside the Client Component
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
      )
    },
    {
      key: "name",
      label: "Nama Mitra / Institusi",
      render: (_, row: Partnership) => (
        <span className="font-semibold text-slate-800 capitalize leading-snug">{row.name}</span>
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
      searchPlaceholder="Cari nama mitra atau institusi kerja sama..."
      emptyMessage="Data kerja sama tidak ditemukan."
    />
  );
}
