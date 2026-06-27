import { notFound } from "next/navigation";
import { getVisionMission } from "@/actions/visionMission";
import { getStatisticStudents } from "@/actions/statisticStudent";
import ProgramInfo from "@/components/Sections/ProgramInfo";
import StudentStatistics from "@/components/Sections/StudentStatistics";
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
    title: `Profil ${prodiName} | Teknik Informatika Universitas Muhammadiyah Cirebon`,
    description: `Profil, Visi Misi, dan Statistik Mahasiswa Program Studi ${prodiName} Universitas Muhammadiyah Cirebon.`,
  };
}

export default async function ProdiPage({ params }: PageProps) {
  const { prodi } = await params;
  const prodiUpper = prodi.toUpperCase();

  if (prodiUpper !== "S1" && prodiUpper !== "D3") {
    notFound();
  }

  // Fetch data with prodi filter
  const visionMissionResponse = await getVisionMission({ limit: 1, prodi: prodiUpper as "S1" | "D3" });
  const statisticsResponse = await getStatisticStudents({ limit: 100, prodi: prodiUpper as "S1" | "D3" });

  const visionMissionData = visionMissionResponse.data || [];
  const statisticsData = statisticsResponse.data || [];

  const prodiName = prodiUpper === "S1" ? "S1 Teknik Informatika" : "D3 Teknik Informatika";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil & Visi Misi {prodiName}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Informasi profil, visi misi, serta arah kebijakan kurikulum Program Studi {prodiName} Universitas Muhammadiyah Cirebon.
          </p>
        </div>
      </section>

      {/* Program Info (Vision & Mission) */}
      <ProgramInfo visionMission={visionMissionData} prodi={prodiUpper as "S1" | "D3"} showVisionMission={true} />

      {/* Student Statistics */}
      <StudentStatistics data={statisticsData} />
    </>
  );
}
