import { getCategoryBySlug } from "@/actions/category";
import NewsCard from "@/components/Sections/berita/NewsCard"; // Pakai Card yang sudah ada
import {
  CategoryAPIResponse,
  PaginatedCategoryResponse,
} from "@/types/category";
import { News } from "@/types/news";
import { notFound } from "next/navigation";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const response = await getCategoryBySlug({
    slug,
    page: Number(page ?? 1),
    limit: 6,
  });

  const category: CategoryAPIResponse = response;

  if (!category) notFound();

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-3xl font-bold">Kategori: {category.data.name}</h1>
          <p className="text-muted-foreground mt-2">
            Menampilkan berita terbaru dalam topik {category.data.name}
          </p>
        </header>

        {/* Gunakan Grid yang sama dengan NewsSection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.data.news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Tambahkan Paginasi di sini jika diperlukan */}
      </div>
    </main>
  );
}
