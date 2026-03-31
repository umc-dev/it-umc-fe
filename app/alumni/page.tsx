import { getAlumni } from "@/actions/alumni";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import { GraduationCap } from "lucide-react";
import type { Alumni } from "@/types/alumni";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Alumni | Teknik Informatika",
  description:
    "Jejak langkah dan kisah sukses para lulusan Teknik Informatika Universitas Muhammadiyah Cirebon.",
};

export const revalidate = 3600;

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function AlumniPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const limit = Number(params?.limit ?? 9);

  // Inisialisasi dengan tipe array Alumni kosong
  let alumniList: Alumni[] = [];
  let meta = { total: 0, page: 1, limit, totalPages: 0 };

  try {
    const response = await getAlumni({ limit, page });
    
    // Pastikan response data ada sebelum assignment
    if (response?.data) {
      alumniList = response.data;
      meta = response.meta;
    }
  } catch (error) {
    console.error("Gagal mengambil data alumni:", error);
    // alumniList tetap [] jika error
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni Kami, Kebanggaan Kami</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dengar langsung pengalaman nyata dari mereka yang telah berkarier dan sukses di industri.
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
                    Daftar Alumni
                </h2>
              </div>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-xl">
                Menampilkan {alumniList.length} profil alumni beserta testimoni dan kisah perjalanan karir mereka.
              </p>
            </div>
          </div>

          {/* Render AlumniGrid */}
          {alumniList.length > 0 ? (
            <>
              <AlumniGrid members={alumniList} />
              <Pagination meta={meta} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-3xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Belum ada data alumni
              </h3>
              <p className="text-muted-foreground max-w-md">
                Data alumni belum tersedia saat ini. Silakan kembali lagi nanti untuk pembaruan terbaru.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}