"use client";

import { Facebook, Twitter, Linkedin, Instagram, Link2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  layout?: "vertical" | "horizontal";
}

export default function ShareButtons({ title, layout = "vertical" }: ShareButtonsProps) {
  const isHorizontal = layout === "horizontal";
  const getCurrentUrl = () => window.location.href;

  const openShareWindow = (shareUrl: string) => {
    // Biarkan pop-up agar lebih rapi
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      alert("Tautan berhasil disalin ke Papan Klip!");
    } catch (err) {
      console.error("Gagal menyalin tautan", err);
    }
  };

  const handleInstagram = () => {
    // Instagram tidak memiliki direct URL share untuk feed di web.
    // Jadi disalin otomatis dan membuka link Instagram.
    handleCopyLink().then(() => {
      window.open("https://www.instagram.com/", "_blank");
    });
  };

  return (
    <div className={isHorizontal ? "flex flex-col gap-3 w-full" : "sticky top-24 flex flex-col gap-4 items-center"}>
      <p className={`text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ${isHorizontal ? "text-left" : "[writing-mode:vertical-lr] py-2"}`}>
        Bagikan Artikel Ini
      </p>

      <div className={isHorizontal ? "flex flex-row flex-wrap items-center gap-3" : "flex flex-col gap-4 items-center"}>
      {/* Facebook */}
      <button
        onClick={() =>
          openShareWindow(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              getCurrentUrl()
            )}`
          )
        }
        className="p-3 rounded-full bg-card border hover:text-[#1877F2] hover:border-[#1877F2] transition-all shadow-sm"
        title="Bagikan ke Facebook"
      >
        <Facebook size={20} />
      </button>

      {/* Twitter / X */}
      <button
        onClick={() =>
          openShareWindow(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              getCurrentUrl()
            )}&text=${encodeURIComponent(title)}`
          )
        }
        className="p-3 rounded-full bg-card border hover:text-foreground hover:border-foreground transition-all shadow-sm"
        title="Bagikan ke Twitter / X"
      >
        <Twitter size={20} />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() =>
          openShareWindow(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              getCurrentUrl()
            )}`
          )
        }
        className="p-3 rounded-full bg-card border hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all shadow-sm"
        title="Bagikan ke LinkedIn"
      >
        <Linkedin size={20} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() =>
          openShareWindow(
            `https://wa.me/?text=${encodeURIComponent(
              `${title}\n\nBaca selengkapnya di: ${getCurrentUrl()}`
            )}`
          )
        }
        className="p-3 rounded-full bg-card border hover:text-[#25D366] hover:border-[#25D366] transition-all shadow-sm"
        title="Bagikan ke WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </button>

      {/* Instagram */}
      <button
        onClick={handleInstagram}
        className="p-3 rounded-full bg-card border hover:text-[#E1306C] hover:border-[#E1306C] transition-all shadow-sm"
        title="Salin Tautan & Buka Instagram"
      >
        <Instagram size={20} />
      </button>

      <div className={isHorizontal ? "hidden sm:block w-px h-8 bg-border mx-1 border-l" : "w-8 h-px bg-border my-1 border-t"} />

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="p-3 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-sm"
        title="Salin Tautan"
      >
        <Link2 size={20} />
      </button>
      </div>
    </div>
  );
}
