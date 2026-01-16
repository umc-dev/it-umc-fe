import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
import type { News } from "@/types/news";
import { getRelativeTime } from "@/lib/utils";

type Props = {
  item: News;
};

export default function NewsCard({ item }: Props) {
  return (
    <Link
      href={`/berita/${item.slug}`}
      className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 h-full relative"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.thumbnail || "/images/news/placeholder.jpg"}
          alt={item.title}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />

        <div className="absolute top-4 right-4">
          <span className="bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-lg border border-border shadow-sm">
            {item.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-border to-transparent group-hover:via-accent/50 transition-colors" />

        <div className="flex items-center gap-2 mb-4 text-xs font-medium text-muted-foreground">
          <Calendar size={14} className="text-accent" />
          <span>{getRelativeTime(item.createdAt)}</span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {item.admin.name}
        </p>

        <div className="flex items-center justify-between pt-4 mt-auto border-t border-dashed border-border group-hover:border-accent/30 transition-colors">
          <span className="text-sm font-semibold group-hover:text-accent transition-colors">
            Baca Artikel
          </span>
          <span className="bg-secondary text-secondary-foreground p-2 rounded-full group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
