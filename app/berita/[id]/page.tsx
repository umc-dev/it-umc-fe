import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { getNewsById, newsItems } from "@/lib/news-data";

export const metadata = {
  title: "Detail Berita - Program Studi Teknik Informatika",
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

  if (isNaN(newsId)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">ID Tidak Valid</h1>
          <Link href="/berita" className="text-accent font-bold">
            ← Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  const article = getNewsById(newsId);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
          <Link href="/berita" className="text-accent">
            ← Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  const relatedNews = newsItems.filter((item) => item.id !== newsId).slice(0, 2);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="bg-muted border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/berita"
              className="inline-flex items-center text-accent hover:gap-2 transition-all gap-1"
            >
              <ArrowLeft size={16} />
              Kembali ke Berita
            </Link>
          </div>
        </div>

        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar size={16} />
                  {article.date}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {article.title}
              </h1>
            </div>

            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12 bg-muted">
              <Image
                src={article.image || "/images/news/placeholder.jpg"}
                alt={article.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              {article.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-foreground/80 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t border-border my-12" />

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Berita Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.id}`}
                    className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={news.image || "/images/news/placeholder.jpg"}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-accent">
                          {news.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {news.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}