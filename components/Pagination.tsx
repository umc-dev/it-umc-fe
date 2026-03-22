"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
};

function PaginationContent({ meta, onPageChange }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
    if (key === "page" && onPageChange) {
      onPageChange(Number(value));
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (key === "limit" || key === "search") {
      params.set("page", "1");
    }

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (meta.totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      <button
        onClick={() => updateParams("page", (meta.page - 1).toString())}
        disabled={meta.page <= 1}
        className="p-2 rounded-lg border bg-card disabled:opacity-30 hover:bg-accent transition-all"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex gap-2">
        {[...Array(meta.totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => updateParams("page", pageNum.toString())}
              className={`w-10 h-10 rounded-lg border font-medium transition-all ${
                meta.page === pageNum
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-card hover:bg-accent"
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={meta.page === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => updateParams("page", (meta.page + 1).toString())}
        disabled={meta.page >= meta.totalPages}
        className="p-2 rounded-lg border bg-card disabled:opacity-30 hover:bg-accent transition-all"
        aria-label="Next Page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="mt-12 h-10 w-full" />}>
      <PaginationContent {...props} />
    </Suspense>
  );
}
