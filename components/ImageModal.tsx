"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  imageClassName?: string;
  wrapperClassName?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

export default function ImageModal({
  src,
  alt,
  imageClassName = "object-cover",
  wrapperClassName = "relative w-full h-full",
  priority = false,
  unoptimized = false,
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Trigger Area */}
      <div 
        className={`${wrapperClassName} cursor-pointer group block`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={unoptimized}
          className={`transition-transform duration-500 group-hover:scale-[1.02] ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
           <div className="opacity-0 group-hover:opacity-100 bg-black/60 text-white rounded-full p-4 backdrop-blur-sm transition-all transform scale-75 group-hover:scale-100 shadow-xl border border-white/10">
             <ZoomIn size={28} />
           </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-all z-[110] outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X size={28} />
          </button>
          
          {/* Image Container */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized={unoptimized}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
