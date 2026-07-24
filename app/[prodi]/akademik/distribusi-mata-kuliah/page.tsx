import PdfViewerClient from '@/components/PdfViewerClient';
import { getStudies } from '@/actions/studies';
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ prodi: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();
  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    return {
      title: "Halaman Tidak Ditemukan | Teknik Informatika",
    };
  }
  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";
  return {
    title: `Distribusi Mata Kuliah ${prodiName} | Teknik Informatika`,
    description: `Informasi sebaran mata kuliah dan Distribusi Mata Kuliah Program Studi ${prodiName} UMC.`,
  };
}

// Revalidate halaman ini tiap 1 menit jika ada update PDF dari backend
export const revalidate = 60;

export default async function HalamanDistribusiMataKuliah({ params }: PageProps) {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();

  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    notFound();
  }

  const studyResponse = await getStudies({ prodi: prodiUpper as "S1" | "D3" });
  
  // Ambil data pertama jika ada
  const studyData = studyResponse.data.length > 0 ? studyResponse.data[0] : null;
  
  // Karena field source di backend menyimpan path relatif (contoh: '/uploads/file.pdf') atau absolute URL
  // Jika path relatif, kita perlu gabungkan dengan base URL untuk gambar/file dari backend
  // Namun kalau sudah absolute, pakai saja. Biasanya di it-umc-be /uploads/..., jadi pastikan full URL.
  const baseUrl = process.env.API_URL?.replace('/api/v1', '') || 'http://localhost:9090';
  let pdfUrl = null;
  
  if (studyData?.source) {
    if (studyData.source.startsWith('http')) {
      pdfUrl = studyData.source;
    } else {
      pdfUrl = `${baseUrl}${studyData.source}`;
    }
  }

  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Distribusi Mata Kuliah</h1>
          <p className="text-lg md:text-xl text-white/90">
            Pedoman dan struktur pembelajaran untuk mewujudkan lulusan {prodiName} UMC yang unggul
          </p>
        </div>
      </section>

      {/* PDF Viewer */}
      <div className="container mx-auto py-16 px-4">
        {pdfUrl ? (
          <PdfViewerClient pdfUrl={pdfUrl} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-lg font-medium text-gray-500">
              Dokumen distribusi mata kuliah untuk {prodiName} belum tersedia.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
