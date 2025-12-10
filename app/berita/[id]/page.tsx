import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
} from "lucide-react";
import { getNewsById, newsItems } from "@/lib/news-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Berita - Teknik Informatika",
  description:
    "Baca berita lengkap dan terbaru dari Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon",
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const newsId = Number(id);

  // --- ERROR STATES (Styled) ---
  if (isNaN(newsId) || !getNewsById(newsId)) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card p-8 rounded-2xl border border-border shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground mb-6">
            Berita yang Anda cari mungkin telah dihapus atau ID tidak valid.
          </p>
          <Link
            href="/berita"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all w-full"
          >
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  const article = getNewsById(newsId)!; // Non-null assertion aman karena sudah dicek di atas

  // Logic Related News
  const relatedNews = newsItems
    .filter((item) => item.id !== newsId)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        {/* 1. NAVIGATION & HERO HEADER */}
        <section className="relative pt-12 pb-16 px-4 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

          <div className="container mx-auto max-w-4xl">
            {/* Title & Meta */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {article.category}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm md:text-base border-y border-border/50 py-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  <span className="font-medium text-foreground">
                    Admin Prodi
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{article.date}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>5 Menit Baca</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN CONTENT LAYOUT */}
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Image */}
          <div className="relative aspect-video md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-12 group">
            <Image
              src={article.image || "/images/news/placeholder.jpg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT SIDEBAR: Sticky Share Buttons (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-4 items-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest writing-vertical-lr py-2">
                  Share
                </p>
                <button className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-lg transition-all">
                  <Facebook size={20} />
                </button>
                <button className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-lg transition-all">
                  <Twitter size={20} />
                </button>
                <button className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2] hover:shadow-lg transition-all">
                  <Linkedin size={20} />
                </button>
                <div className="h-8 w-px bg-border my-2" />
                <button className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent hover:shadow-lg transition-all">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            {/* CENTER: Article Content */}
            <div className="lg:col-span-8">
              <article className="prose prose-lg md:prose-xl max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
                {/* Drop Cap styling applied manually to first paragraph */}
                {article.content.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`leading-loose mb-8 text-lg ${idx === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>

              {/* Tags Section (Dummy) */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                  Topik Terkait
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Teknologi",
                    "Kampus",
                    "Cirebon",
                    "Mahasiswa",
                    "Prestasi",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground text-sm rounded-lg hover:bg-secondary cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Share */}
              <div className="lg:hidden mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span className="font-bold text-foreground">Bagikan:</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-card rounded-full border">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 bg-card rounded-full border">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 bg-card rounded-full border">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. RELATED NEWS */}
        <section className="mt-24 pt-16 pb-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Baca Juga Berita Lainnya
              </h2>
              <Link
                href="/berita"
                className="text-accent font-semibold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Lihat Semua <ArrowLeft className="rotate-180" size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.id}`}
                  className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={news.image || "/images/news/placeholder.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded border border-border">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      <span>{news.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {news.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-dashed border-border flex items-center text-sm font-semibold text-accent">
                      Baca Artikel
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
