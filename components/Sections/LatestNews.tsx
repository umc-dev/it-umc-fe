import Link from "next/link"
import Image from "next/image"; 
import { ArrowRight } from "lucide-react"
import { newsItems } from "@/lib/news-data"
import { SkeletonNewsCard } from "@/components/skeletons/skeleton-news-card"
import { SKELETON_COUNTS } from "@/lib/skeleton-utils"

interface LatestNewsProps {
  isLoading?: boolean
}

export default function LatestNews({ isLoading = false }: LatestNewsProps) {
  const recentNews = newsItems.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Berita Terbaru</h2>
          <p className="text-muted-foreground text-lg">
            Ikuti perkembangan terkini dari Program Studi Teknik Informatika
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: SKELETON_COUNTS.NEWS }).map((_, i) => <SkeletonNewsCard key={i} />)
            : recentNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border"
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
                    <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
                    <Link
                      href={`/berita/${item.id}`}
                      className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all gap-1"
                    >
                      Baca Selengkapnya
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/berita"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  )
}
