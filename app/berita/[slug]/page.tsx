import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
} from "lucide-react";
import { getNewsDetail, getNews } from "@/actions/news";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelativeTime } from "@/lib/utils";

// --- SEO OPTIMIZATION (Dynamic Metadata) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsDetail(slug);

  if (!article) return { title: "Berita Tidak Ditemukan" };

  return {
    title: `${article.title} - Teknik Informatika UMC`,
    description: article.content.replace(/<[^>]*>?/gm, "").substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.replace(/<[^>]*>?/gm, "").substring(0, 160),
      images: [article.thumbnail],
      type: "article",
      publishedTime: article.createdAt,
      authors: [article.admin?.name || "Admin"],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("Slug yang diterima:", slug);
  const article = await getNewsDetail(slug);

  // Jika getNewsDetail memanggil notFound(), kode di bawah tidak akan dieksekusi
  // Tapi untuk keamanan tambahan:
  if (!article) notFound();

  const relatedResponse = await getNews({ limit: 3 });
  const relatedNews = relatedResponse.data.filter((item) => item.slug !== slug);

  const cleanContent = article.content
    ? article.content.replace(/^"|"$/g, "")
    : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        {/* 1. NAVIGATION & HERO HEADER */}
        <section className="relative pt-12 pb-16 px-4 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-primary/5 to-transparent -z-10" />

          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {article.category?.name}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm md:text-base border-y border-border/50 py-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span className="font-medium text-foreground">
                  {article.admin?.name}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{getRelativeTime(article.createdAt)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN CONTENT LAYOUT */}
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Main Image - Menggunakan img standar untuk localhost */}
          <div className="relative aspect-video md:aspect-21/9 w-full rounded-2xl md:rounded-3xl overflow-hidden mb-12">
            <img
              src={article.thumbnail || "/images/placeholder.jpg"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT SIDEBAR: Sticky Share */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-4 items-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] [writing-mode:vertical-lr] py-2">
                  Bagikan
                </p>
                <button className="p-3 rounded-full bg-card border hover:text-[#1877F2] transition-all">
                  <Facebook size={20} />
                </button>
                <button className="p-3 rounded-full bg-card border hover:text-[#1DA1F2] transition-all">
                  <Twitter size={20} />
                </button>
                <button className="p-3 rounded-full bg-card border hover:text-[#0A66C2] transition-all">
                  <Linkedin size={20} />
                </button>
              </div>
            </div>

            {/* CENTER: Article Content */}
            <div className="lg:col-span-8">
              {/* WYSIWYG Content Rendering */}
              <article className="prose prose-slate max-w-none lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
              </article>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                  Topik Terkait
                </h3>
                <div className="flex flex-wrap gap-2">
                  <a href={`/kategori/${article.category.slug}`}>
                    <span className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg">{`#${article.category.name}`}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. RELATED NEWS SECTION */}
        <section className="mt-24 pt-16 pb-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">
              Baca Juga Berita Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.slug}`}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {getRelativeTime(news.createdAt)}
                    </p>
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
