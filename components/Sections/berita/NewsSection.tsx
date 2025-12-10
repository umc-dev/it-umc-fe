"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Search, ArrowUpRight } from "lucide-react";
import { newsItems } from "@/lib/news-data";

export default function NewsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Ambil daftar kategori unik dari data
  const categories = [
    "Semua",
    ...new Set(newsItems.map((item) => item.category)),
  ];

  // Logika Filter
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Kategori Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-card border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* --- NEWS GRID --- */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.id}`}
                className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 h-full relative"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image || "/images/news/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay Gradient saat hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-background/90 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-lg border border-border shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 relative">
                  {/* Dekorasi Garis */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-accent/50 transition-colors" />

                  <div className="flex items-center gap-2 mb-4 text-xs font-medium text-muted-foreground">
                    <Calendar size={14} className="text-accent" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-dashed border-border group-hover:border-accent/30 transition-colors">
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      Baca Artikel
                    </span>
                    <span className="bg-secondary text-secondary-foreground p-2 rounded-full group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State jika pencarian tidak ditemukan */
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <div className="inline-flex bg-muted p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Artikel tidak ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba cari dengan kata kunci lain.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
