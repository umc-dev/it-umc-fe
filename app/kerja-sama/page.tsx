import { Suspense } from "react";
import KerjaSamaTableWrapper from "@/components/kerja-sama/KerjaSamaTableWrapper";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";

export const metadata = {
  title: "Kerja Sama | Teknik Informatika",
  description:
    "Jejaring dan kemitraan strategis Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon dengan berbagai perusahaan dan institusi.",
};

export const revalidate = 60;

export default async function KerjaSamaPage(props: {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kerja Sama</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Jejaring dan kemitraan strategis Teknik Informatika Universitas Muhammadiyah Cirebon dengan industri, institusi, dan dunia usaha.
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
                    Daftar Kemitraan
                </h2>
              </div>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-xl">
                Menelusuri direktori perusahaan, universitas, maupun lembaga yang berkolaborasi aktif dengan program studi.
              </p>
            </div>
          </div>

          <Suspense fallback={<SkeletonTable />}>
            <KerjaSamaTableWrapper search={search} page={page} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
