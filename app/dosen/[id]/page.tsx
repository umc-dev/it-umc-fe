import { getDosenDetail } from "@/actions/dosen";
import DosenDetailView from "@/components/dosen/DosenDetailView";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dosen = await getDosenDetail(id);
  if (!dosen) {
    return {
      title: "Dosen Tidak Ditemukan | Teknik Informatika",
    };
  }
  return {
    title: `${dosen.name} | Teknik Informatika`,
    description: `Profil dan Catatan Tridharma (Pengajaran, Penelitian, Pengabdian) dari ${dosen.name}.`,
  };
}

export default async function DosenDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dosen = await getDosenDetail(id);

  if (!dosen) {
    notFound();
  }

  return <DosenDetailView dosen={dosen} />;
}
