"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Search,
  ExternalLink,
  Tag,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { News } from "@/types/news";
import { getRelativeTime } from "@/lib/utils";

type Props = {
  promotions: News[];
  search: string;
};

export default function PromosiClient({ promotions, search }: Props) {
  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const featuredPromos = promotions.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50/50 text-foreground flex flex-col font-sans selection:bg-accent selection:text-white">
      {/* Header Banner */}
      <header className="relative z-10 pt-24 pb-12 bg-white border-b border-border/60 shadow-xs">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={14} className="animate-pulse" />
                <span>Eksklusif & Promo UMC</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-none mb-3">
                Promosi & Highlight
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                Temukan penawaran program studi, beasiswa menarik, dan galeri event promosi Teknik Informatika.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-80">
              <form method="GET" action="/promosi" className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Cari promo / beasiswa..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-xs"
                />
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 py-12 container mx-auto px-4 max-w-6xl space-y-16">
        {promotions.length > 0 ? (
          <>
            {/* CAROUSEL FEATURED PROMO BANNER */}
            {!search && featuredPromos.length > 0 && (
              <section className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-accent rounded-full inline-block" />
                    Promo Unggulan
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={scrollPrev}
                      className="p-2.5 rounded-full bg-white border border-border text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all cursor-pointer shadow-xs"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={scrollNext}
                      className="p-2.5 rounded-full bg-white border border-border text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all cursor-pointer shadow-xs"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-xl" ref={emblaRef}>
                  <div className="flex">
                    {featuredPromos.map((item) => (
                      <div key={item.id} className="flex-[0_0_100%] min-w-0 relative">
                        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] md:min-h-[460px]">
                          {/* Image Banner */}
                          <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-full overflow-hidden">
                            <img
                              src={item.thumbnail || "/images/news/placeholder.jpg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/90" />
                          </div>

                          {/* Detail Info Banner */}
                          <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-white">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 text-xs font-bold rounded-lg uppercase tracking-wide">
                                  {item.category?.name || "Promosi"}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <Calendar size={13} className="text-accent" />
                                  {getRelativeTime(item.createdAt)}
                                </span>
                              </div>

                              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-4 line-clamp-2 hover:text-accent transition-colors">
                                {item.title}
                              </h3>

                              <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed mb-6">
                                {item.content.replace(/<[^>]*>?/gm, "")}
                              </p>
                            </div>

                            <Link
                              href={`/berita/${item.slug}`}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-bold text-sm rounded-xl shadow-md transition-all group"
                            >
                              <span>Klaim / Lihat Promo</span>
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {featuredPromos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedIndex === idx
                          ? "w-8 bg-accent"
                          : "w-2 bg-border hover:bg-muted-foreground/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* MASONRY / MOCKUP GALLERY GRID */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
                  Galeri Promosi & Penawaran
                </h2>
                <span className="text-xs text-muted-foreground font-medium">
                  Menampilkan {promotions.length} Promo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((item, idx) => {
                  const isFeaturedAspect = idx % 5 === 0;
                  return (
                    <div
                      key={item.id}
                      className={`group relative rounded-3xl overflow-hidden border border-border/70 bg-white hover:border-accent/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl flex flex-col ${
                        isFeaturedAspect ? "md:col-span-2 lg:col-span-2" : ""
                      }`}
                    >
                      {/* Image Preview Container */}
                      <div
                        className={`relative w-full overflow-hidden bg-muted ${
                          isFeaturedAspect ? "h-72 md:h-80" : "h-64"
                        }`}
                      >
                        <img
                          src={item.thumbnail || "/images/news/placeholder.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {/* Top Floating Badge */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/90 backdrop-blur-md border border-border/60 text-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Tag size={12} className="text-accent" />
                            {item.category?.name || "Promosi"}
                          </span>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="p-6 flex flex-col flex-1 justify-between relative bg-white">
                        <div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mb-3">
                            <Calendar size={13} className="text-accent" />
                            <span>{getRelativeTime(item.createdAt)}</span>
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-6">
                            {item.content.replace(/<[^>]*>?/gm, "")}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                          <Link
                            href={`/berita/${item.slug}`}
                            className="text-xs font-bold text-accent uppercase tracking-wider hover:underline flex items-center gap-1"
                          >
                            <span>Detail Promo</span>
                            <ExternalLink size={14} />
                          </Link>
                          <span className="w-8 h-8 rounded-full bg-slate-100 text-foreground flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                            <ArrowRight size={15} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          /* MODERN HERO EMPTY / FALLBACK CARD */
          <div className="max-w-3xl mx-auto my-12 p-8 md:p-14 text-center rounded-3xl bg-white border border-dashed border-border shadow-sm relative overflow-hidden">
            <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/20 shadow-inner">
              <Megaphone size={38} className="animate-bounce" />
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              {search ? "Promosi Tidak Ditemukan" : "Belum Ada Promosi Berlangsung"}
            </h3>

            <p className="text-muted-foreground text-base max-w-lg mx-auto mb-8 leading-relaxed">
              {search
                ? `Tidak ada promosi atau beasiswa yang sesuai dengan kata kunci "${search}".`
                : "Saat ini belum ada promosi aktif atau event beasiswa terbaru. Dapatkan update pendaftaran PMB atau jelajahi artikel kampus kami!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://pmb.umc.ac.id"
                target="_blank"
                className="px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                Pendaftaran PMB UMC
              </Link>
              <Link
                href="/berita"
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-foreground font-bold rounded-xl border border-border transition-all text-sm flex items-center justify-center"
              >
                Lihat Berita & Kegiatan
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
