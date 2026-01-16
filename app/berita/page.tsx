import { Metadata } from "next";
import NewsSection from "@/components/Sections/berita/NewsSection";
import { getNews } from "@/actions/news";
import { Suspense } from "react";
import NewsSkeleton from "@/components/Sections/berita/NewsSkeleton";

export const metadata: Metadata = {
  title: "Berita & Pengumuman - Program Studi Teknik Informatika",
  description:
    "Ikuti perkembangan terkini dari Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    limit?: string;
  }>;
};

export default async function AllNewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const search = params?.search ?? "";
  const limit = Number(params?.limit ?? 10);

  const [news] = await Promise.all([getNews({ page, search, limit })]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Berita & Pengumuman
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Ikuti perkembangan terkini dari Program Studi Teknik Informatika
            </p>
          </div>
        </section>

        {/* News Grid */}
        <Suspense
          key={`${search}-${page}-${limit}`}
          fallback={
            <div className="container mx-auto px-4 py-16">
              <NewsSkeleton />
            </div>
          }
        >
          <NewsSection items={news.data} search={search} meta={news.meta} />
        </Suspense>
      </main>
    </div>
  );
}
