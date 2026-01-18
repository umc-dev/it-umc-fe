import { getDosen } from "@/actions/dosen";
import StaffGrid from "@/components/StaffGrid";
// Sesuaikan path fetcher yang dibuat sebelumnya

export const metadata = {
  title: "Dosen | Teknik Informatika",
  description:
    "Dosen-dosen berpengalaman dengan keahlian di berbagai bidang Teknologi Informasi",
};

export default async function DosenPage() {
  // Fetch data langsung dari API backend
  // Kita set limit agak besar (misal 50) agar semua dosen muncul,
  // atau biarkan default (6) sesuai API awal kamu.
  const response = await getDosen({ limit: 50 });
  const lecturers = response.data;

  console.log(response.data);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dosen</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dosen profesional yang siap membimbing dan mendukung perjalanan
            akademik Anda di Teknik Informatika
          </p>
        </div>
      </section>

      {/* Lecturers Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Daftar Pengajar
              </h2>
            </div>
            <div className="w-16 h-1 bg-accent rounded-full"></div>
            <p className="text-muted-foreground mt-4 text-lg">
              Menampilkan {lecturers.length} dosen dengan berbagai bidang
              keahlian
            </p>
          </div>

          {/* Render StaffGrid dengan data dari API */}
          {lecturers.length > 0 ? (
            <StaffGrid members={lecturers} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground italic">
                Data dosen tidak ditemukan.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
