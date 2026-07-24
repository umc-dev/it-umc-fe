import { Suspense } from "react";
import PrestasiTableWrapper from "../../../components/prestasi/PrestasiTableWrapper";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ prodi: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
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
    title: `Prestasi Mahasiswa ${prodiName} | Teknik Informatika`,
    description: `Daftar pencapaian dan prestasi gemilang mahasiswa program studi ${prodiName} Universitas Muhammadiyah Cirebon.`,
  };
}

export const revalidate = 60;

export default async function PrestasiPage({ params, searchParams }: PageProps) {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();

  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    notFound();
  }

  const sParams = await searchParams;
  const page = sParams.page ? parseInt(sParams.page) : 1;
  const search = sParams.search || "";

  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prestasi Mahasiswa {prodiName}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Deretan pencapaian luar biasa dan penemuan nyata yang mengharumkan nama {prodiName} Universitas Muhammadiyah Cirebon.
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
                Menelusuri sejarah prestasi akademik maupun non-akademik dari mahasiswa kami.
              </p>
            </div>
          </div>

          <Suspense fallback={<SkeletonTable />}>
            <PrestasiTableWrapper search={search} page={page} prodi={prodiUpper as "S1" | "D3"} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
