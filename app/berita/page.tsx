import Link from "next/link";
import { Calendar } from "lucide-react";
import { newsItems } from "@/lib/news-data";
import Image from "next/image";

export const metadata = {
  title: "Berita & Pengumuman - Program Studi Teknik Informatika",
  description:
    "Ikuti perkembangan terkini dari Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon",
};

export default function AllNewsPage() {
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-border transition-all duration-300"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={item.image || "/images/news/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM5Q0E0QUYiLz48L3N2Zz4="
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <span className="inline-flex items-center text-accent font-semibold group-hover:gap-2 transition-all gap-1">
                      Baca Selengkapnya
                    </span>
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
