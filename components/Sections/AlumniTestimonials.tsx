"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, User, GraduationCap, Play, ArrowRight, PauseCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Alumni } from "@/types/alumni";

// String Base64 sederhana untuk efek blur (Placeholder)
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vz1fwAIpALCXjh/2AAAAABJRU5ErkJggg==";

// --- Helper: Video Utilities ---
const getVideoId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Komponen Video Preview (Lazy Load)
const VideoPreview = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      >
        <Play className="h-4 w-4" /> Tonton Video
      </Link>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-inner">
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
      className="group relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-card shadow-md border border-border"
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        alt="Video Thumbnail"
        fill
        className="object-cover opacity-90 transition-opacity group-hover:opacity-75"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm transition-transform group-hover:scale-110 border border-white/20">
          <Play className="h-6 w-6 fill-white text-white" />
        </div>
      </div>
    </button>
  );
};

interface AlumniTestimonialsProps {
  alumni: Alumni[];
}

export default function AlumniTestimonials({ alumni = [] }: AlumniTestimonialsProps) {
  // Setup Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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
          {/* Badge*/}
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

        {/* Carousel Area */}
        <div className="relative">
          {/* Tombol Kontrol Manual */}
          <div className="absolute -top-12 right-0 z-10 hidden md:block">
            <button
              onClick={toggleAutoplay}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {isPlaying ? <PauseCircle className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? "Jeda Slider" : "Putar Slider"}
            </button>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y gap-6 py-8 pl-4">
              {alumni.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-[0_0_auto] w-[320px] md:w-100"
                >
                  <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                    
                    {/* Icon Quote */}
                    <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />

                    <div>
                      {/* Profil */}
                      <div className="mb-6 flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/10 bg-muted">
                          <Image
                            src="/teknisi-pria-dengan-tools.webp"
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{item.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <GraduationCap className="h-3 w-3 text-primary" />
                            <span>Lulusan {item.year}</span>
                          </div>
                        </div>
                      </div>
                      {/* Testimonial Message */}
                      <div className="relative mb-4 max-h-37.5 w-full overflow-y-auto pr-2
                        whitespace-normal wrap-break-word
                        [&::-webkit-scrollbar]:w-1 
                        [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:rounded-full 
                        [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 
                        hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40"
                      >
                        <p className="text-base leading-relaxed text-muted-foreground/90">
                          &quot;{item.message}&quot;
                        </p>
                      </div>
                    </div>

                    {/* Footer: Video */}
                    <div className="mt-auto border-t border-border pt-4">
                      {item.video && item.video.trim() !== "" ? (
                        <VideoPreview url={item.video} />
                      ) : (
                        <div className="mt-4 py-2 text-center text-sm italic text-muted-foreground/60 bg-muted/50 rounded-xl">
                          Tidak ada video
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Butto */}
        <div className="mt-12 text-center">
          <Link
            href="/alumni"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Lihat Semua Alumni
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}