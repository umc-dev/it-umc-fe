"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { News } from "@/types/news";
import NewsCard from "./NewsCard";
import Pagination from "@/components/Pagination";

type Props = {
  items: News[];
  search: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export default function NewsSection({ items, search, meta }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
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

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2"></div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateParams("search", (e.target as HTMLInputElement).value);
                }
              }}
              placeholder="Cari berita..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border bg-card"
            />
          </div>
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed rounded-2xl">
            <Search className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
            <p className="font-semibold">Artikel tidak ditemukan</p>
          </div>
        )}
      </div>

      <Pagination meta={meta} />
    </section>
  );
}
