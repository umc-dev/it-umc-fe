import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { newsItems } from "@/lib/news-data";
import { SkeletonNewsCard } from "@/components/skeletons/skeleton-news-card";
import { SKELETON_COUNTS } from "@/lib/skeleton-utils";

interface LatestNewsProps {
  isLoading?: boolean;
}

export default function LatestNews({ isLoading = false }: LatestNewsProps) {
  const mainNews = newsItems[0];
  const sideNews = newsItems.slice(1, 4);

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

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center gap-2">
              {/* Garis dekorasi menggunakan bg-primary */}
              Pojok Berita
            </h2>
            <p className="text-muted-foreground text-lg">
              Kabar terhangat seputar kegiatan dan prestasi Teknik Informatika
            </p>
          </div>
          <Link
            href="/berita"
            // Button menggunakan primary color dengan opacity untuk background
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-4 py-2 bg-primary/10 rounded-lg hover:bg-primary/20"
          >
            Lihat Semua Berita
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Layout: Main (Kiri) + List (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- KOLOM KIRI: Main Featured News (Besar) --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Link
              href={`/berita/${mainNews.id}`}
              className="group block h-full"
            >
              <article className="relative h-full min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border bg-card">
                {/* Image Full Cover */}
                <div className="absolute inset-0">
                  <Image
                    src={mainNews.image || "/images/news/placeholder.jpg"}
                    alt={mainNews.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content Overlay - Text tetap Putih karena di atas overlay gelap */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10 text-white">
                  <div className="mb-4">
                    {/* Badge Kategori mengikuti Primary color */}
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                      {mainNews.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {mainNews.date}
                      </span>
                    </div>
                  </div>

                  {/* Judul */}
                  <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-4 group-hover:text-accent-foreground transition-colors">
                    {mainNews.title}
                  </h3>

                  <p className="text-gray-300 line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl text-sm md:text-base">
                    {mainNews.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          </div>

          {/* --- KOLOM KANAN: Side List News (Kecil) --- */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {/* Header Tab "Terkini" */}
            <div className="flex items-center justify-between border-b border-border pb-2">
              {/* Garis bawah aktif menggunakan border-primary */}
              <h3 className="text-xl font-bold text-foreground border-b-2 border-primary -mb-2.5 pb-2 inline-block">
                Terkini
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {sideNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="group"
                >
                  {/* Card kecil transparan, hover jadi bg-card */}
                  <article className="flex gap-4 p-3 rounded-xl bg-card hover:shadow-sm transition-all border border-transparent hover:border-accent">
                    {/* Thumbnail Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-28 shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/images/news/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center py-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        {/* Kategori text-primary */}
                        <span className="text-primary font-medium">
                          {item.category}
                        </span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>

                      {/* Judul hover text-primary */}
                      <h4 className="font-semibold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>

                      {/* Link Baca text-muted hover text-accent */}
                      <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
                        Baca <ChevronRight size={14} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <Link
              href="/berita"
              className="md:hidden w-full py-3 mt-4 text-center bg-card border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
