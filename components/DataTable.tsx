"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce"; // We will create this

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  totalPages,
  currentPage,
  totalItems,
  searchPlaceholder = "Cari data...",
  emptyMessage = "Data tidak ditemukan",
}: DataTableProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize search input from URL param if exists
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  // Debounce search term to prevent too many URL updates while typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 1. Sync external URL changes back to local state (e.g. user clicks Navbar link to clear search)
  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";
    // If the URL search is different from our debounced state, it means the URL was updated EXTRENALLY!
    if (currentUrlSearch !== debouncedSearchTerm) {
      setSearchTerm(currentUrlSearch);
    }
    // We only want to run this when searchParams changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 2. Sync local debounced state to the URL (User typing)
  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";
    if (debouncedSearchTerm !== currentUrlSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
        params.set("page", "1");
      } else {
        params.delete("search");
        // Only reset page 1 if we actually had a search term that we are clearing
        if (currentUrlSearch) {
          params.set("page", "1"); 
        }
      }
      
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  // Helper to generate pagination URLs
  const createPageUrl = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageIndex.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-slate-50/80 transition-colors last:border-b-0"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-6 py-4 text-sm text-slate-600 align-middle"
                      >
                        {col.render
                          ? col.render(item[col.key as keyof T], item, index)
                          : String(item[col.key as keyof T])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="w-10 h-10 mb-3 opacity-20" />
                      <p>{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer & Server-Side Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-sm text-muted-foreground bg-slate-50 px-3 py-1.5 rounded-lg border border-border/50">
            Total <span className="font-semibold text-slate-700">{totalItems}</span> data (Halaman {currentPage} dari {totalPages})
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              {/* Prev Button */}
              {currentPage > 1 ? (
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className="p-2 border border-border rounded-lg text-slate-600 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="p-2 border border-border/50 rounded-lg text-slate-300 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Page Numbers */}
              <div className="flex items-center mx-1 gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Simplified sliding window for pages (max 5 pages shown)
                  let pageToShow = i + 1;
                  
                  if (totalPages > 5 && currentPage > 3) {
                    pageToShow = currentPage - 2 + i;
                    if (pageToShow > totalPages) return null;
                  }

                  const isActive = pageToShow === currentPage;

                  return (
                    <Link
                      key={pageToShow}
                      href={createPageUrl(pageToShow)}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20 border-primary"
                          : "text-slate-600 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/20"
                      }`}
                    >
                      {pageToShow}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <Link
                  href={createPageUrl(currentPage + 1)}
                  className="p-2 border border-border rounded-lg text-slate-600 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                  aria-label="Halaman selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button disabled className="p-2 border border-border/50 rounded-lg text-slate-300 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
