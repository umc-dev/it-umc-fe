"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight, Newspaper } from "lucide-react";
import type { News } from "@/types/news";
import { SkeletonNewsCard } from "@/components/skeletons/skeleton-news-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface LatestNewsProps {
  news: News[];
  isLoading?: boolean;
}

export default function LatestNews({
  news = [],
  isLoading = false,
}: LatestNewsProps) {
  // 1. Loading State
  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: SKELETON_COUNTS.NEWS }).map((_, i) => (
              <SkeletonNewsCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Empty State (Jika tidak ada berita dari API)
  if (news.length === 0) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground/40">
            <Newspaper size={32} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Pojok Berita Kosong
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mb-6">
            Saat ini belum ada artikel yang diterbitkan. Pantau terus untuk
            informasi mendatang!
          </p>
        </div>
      </section>
    );
  }

  // Slice data untuk layout (1 besar, 3 samping)
  const mainNews = news[0];
  const sideNews = news.slice(1, 4);

  // Helper untuk membersihkan tag HTML dari konten untuk ringkasan
  const stripHtml = (html: string) => html?.replace(/<[^>]*>?/gm, "") || "";

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Pojok Berita
            </h2>
            <p className="text-muted-foreground text-lg">
              Kabar terhangat seputar kegiatan dan prestasi Teknik Informatika
            </p>
          </div>
          <Link
            href="/berita"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-4 py-2 bg-primary/10 rounded-lg"
          >
            Lihat Semua Berita
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- KOLOM KIRI: Featured News (Besar) --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Link
              href={`/berita/${mainNews.slug}`}
              className="group block h-full"
            >
              <article className="relative h-full min-h-[450px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border bg-card">
                <div className="absolute inset-0">
                  <Image
                    src={mainNews.thumbnail || "/placeholder-news.jpg"}
                    alt={mainNews.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10 text-white">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded mb-4">
                    {mainNews.category?.name || "Umum"}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                    <Calendar size={14} className="text-white" />
                    {new Date(mainNews.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-white">
                    {mainNews.title}
                  </h3>
                  <p className="text-gray-300 line-clamp-2 text-sm md:text-base opacity-90">
                    {stripHtml(mainNews.content)}
                  </p>
                </div>
              </article>
            </Link>
          </div>

          {/* --- KOLOM KANAN: Side List (Kecil) --- */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-foreground border-b-2 border-primary w-fit pb-1">
              Terkini
            </h3>

            <div className="flex flex-col gap-4">
              {sideNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group"
                >
                  <article className="flex gap-4 p-2 rounded-xl bg-card/50 hover:bg-card hover:shadow-sm transition-all border border-transparent hover:border-border">
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.thumbnail || "/placeholder-news.jpg"}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase mb-1">
                        {item.category?.name}
                      </span>
                      <h4 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                        <ChevronRight size={12} className="ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <Link
              href="/berita"
              className="md:hidden w-full py-3 text-center bg-primary text-white rounded-lg font-bold text-sm"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
