import { Suspense } from "react";
import PrestasiTableWrapper from "../../components/prestasi/PrestasiTableWrapper";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";

export const metadata = {
  title: "Prestasi | Teknik Informatika",
  description:
    "Daftar pencapaian dan prestasi gemilang mahasiswa Teknik Informatika Universitas Muhammadiyah Cirebon.",
};

export const revalidate = 60;

export default async function PrestasiPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search || "";

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
                Menelusuri sejarah prestasi akademik maupun non-akademik dari mahasiswa kami.
              </p>
            </div>
          </div>

          <Suspense fallback={<SkeletonTable />}>
            <PrestasiTableWrapper search={search} page={page} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
