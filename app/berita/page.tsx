import { Metadata } from "next";
import NewsSection from "@/components/Sections/berita/NewsSection";

export const metadata: Metadata = {
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
        <NewsSection />
      </main>
    </div>
  );
}
