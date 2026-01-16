import { Metadata } from "next";
import { getCategories } from "@/actions/category"; // Sesuaikan path actions
import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kategori Berita - Teknik Informatika UMC",
  description:
    "Cari berita berdasarkan kategori yang tersedia di Teknik Informatika UMC",
};

export default async function AllCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Number(page ?? 1);

  const categoriesData = await getCategories({
    page: currentPage,
    limit: 12, // Tampilkan 12 kategori per halaman
    search: search ?? "",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Kategori Berita</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Jelajahi berbagai topik informasi mulai dari pengumuman, prestasi
            mahasiswa, hingga update teknologi.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesData.data.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className="group p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Folder size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Lihat semua artikel dalam kategori {category.name}.
                  </p>
                </div>

                <div className="mt-6 flex items-center text-primary font-semibold text-sm">
                  Jelajahi{" "}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {categoriesData.data.length === 0 && (
            <div className="text-center py-20 border border-dashed rounded-3xl">
              <Folder className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">
                Kategori tidak ditemukan
              </h2>
              <p className="text-muted-foreground">
                Coba cari dengan kata kunci lain.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
