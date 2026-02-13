"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, User, GraduationCap, Play, ArrowRight, PauseCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Alumni } from "@/types/alumni";

// --- Helper & Video Preview Components  ---
const getVideoId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoPreview = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-primary hover:text-white"
      >
        <Play className="h-4 w-4 transition-transform group-hover:scale-110" /> 
        Tonton Video
      </Link>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative mt-auto aspect-video w-full overflow-hidden rounded-xl bg-black shadow-inner">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative mt-auto aspect-video w-full overflow-hidden rounded-xl bg-slate-900 shadow-sm"
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt="Video Thumbnail"
        fill
        className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-75 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="h-5 w-5 fill-white text-white ml-1" />
        </div>
      </div>
    </button>
  );
};

interface AlumniTestimonialsProps {
  alumni: Alumni[];
}

export default function AlumniTestimonials({ alumni = [] }: AlumniTestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );

  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [emblaApi]);

  if (alumni.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tl from-primary/5 via-background to-accent/5 -z-10" />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <User className="h-4 w-4" />
            Kisah Sukses Alumni
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
            Alumni Kami, Kebanggaan Kami
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Dengar langsung pengalaman nyata dari mereka yang telah berkarier dan sukses di industri.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Controls */}
          <div className="absolute -top-14 right-0 hidden md:block">
            <button
              onClick={toggleAutoplay}
              className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {isPlaying ? <PauseCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y gap-6 py-6 pl-2">
              {alumni.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-[0_0_auto] w-[320px] md:w-95"
                >
                  {/* --- START CARD DESIGN --- */}
                  <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                    
                    {/* 1. Header: Foto & Nama */}
                    <div className="mb-6 flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-background shadow-md bg-muted">
                        <Image
                          src={item.photo || "/teknisi-pria-dengan-tools.webp"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="truncate font-bold text-foreground text-lg">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <GraduationCap className="h-3.5 w-3.5 text-primary" />
                          Angkatan {item.year}
                        </div>
                      </div>
                      <Quote className="h-8 w-8 text-primary/10 rotate-180" />
                    </div>

                    {/* 2. Body: Message (Speech Bubble Style) */}
                    <div className="relative mb-6 flex-1">
                      {/* Buntut Speech Bubble */}
                      <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-muted transition-colors group-hover:bg-muted/80" />
                      
                      {/* Kotak Pesan */}
                      <div className="h-full rounded-2xl bg-muted p-5 transition-colors group-hover:bg-muted/80">
                        <div className="max-h-35 overflow-y-auto pr-2
                          whitespace-normal wrap-break-word
                          [&::-webkit-scrollbar]:w-1 
                          [&::-webkit-scrollbar-track]:bg-transparent 
                          [&::-webkit-scrollbar-thumb]:rounded-full 
                          [&::-webkit-scrollbar-thumb]:bg-slate-300 
                          dark:[&::-webkit-scrollbar-thumb]:bg-slate-600
                          hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
                        >
                          <p className="text-[15px] leading-relaxed text-foreground/80 italic">
                            &quot;{item.message}&quot;
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Footer: Video */}
                    <div className="mt-auto pt-2">
                      {item.video && item.video.trim() !== "" ? (
                        <VideoPreview url={item.video} />
                      ) : (
                        <div className="flex h-45 w-full items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border text-center">
                          <div className="flex flex-col items-center gap-2 p-4">
                             {/* Placeholder jika tidak ada video */}
                             <div className="p-3 rounded-full bg-muted/30">
                                <GraduationCap className="h-6 w-6 text-muted-foreground/40" />
                             </div>
                            <span className="text-xs text-muted-foreground/60">
                              Tidak ada video tersedia
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                  {/* --- END CARD DESIGN --- */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/alumni"
            className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105"
          >
            Lihat Semua Alumni
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}