import { getAchievements } from "@/actions/achievement";
import PrestasiGrid from "@/components/PrestasiGrid";
import { Trophy } from "lucide-react";
import type { Achievement } from "@/types/achievement";

export const metadata = {
  title: "Prestasi | Teknik Informatika",
  description:
    "Daftar pencapaian dan prestasi gemilang mahasiswa Teknik Informatika Universitas Muhammadiyah Cirebon.",
};

export const revalidate = 3600;

export default async function PrestasiPage() {
  let achievementsList: Achievement[] = [];

  try {
    const response = await getAchievements({ limit: 100 });
    
    if (response?.data) {
      achievementsList = response.data;
    }
  } catch (error) {
    console.error("Gagal mengambil data prestasi:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prestasi Mahasiswa</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Deretan pencapaian luar biasa dan penemuan nyata yang mengharumkan nama Teknik Informatika Universitas Muhammadiyah Cirebon.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Daftar Prestasi
                </h2>
              </div>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-xl">
                Menampilkan {achievementsList.length} prestasi akademik maupun non-akademik dari mahasiswa kami.
              </p>
            </div>
          </div>

          {/* Render PrestasiGrid */}
          {achievementsList.length > 0 ? (
            <PrestasiGrid achievements={achievementsList} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-3xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Belum ada data prestasi
              </h3>
              <p className="text-muted-foreground max-w-md">
                Data prestasi belum tersedia saat ini. Silakan kembali lagi nanti untuk pembaruan terbaru.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
