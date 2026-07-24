import { getAchievements } from "@/actions/achievement";
import PrestasiTableClient from "@/components/prestasi/PrestasiTableClient";
import type { Achievement } from "@/types/achievement";

export default async function PrestasiTableWrapper({ 
  search, 
  page,
  prodi
}: { 
  search: string; 
  page: number;
  prodi?: "S1" | "D3";
}) {
  let achievementsList: Achievement[] = [];
  let meta = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  try {
    const response = await getAchievements({ limit: 10, page, search, prodi });
    
    if (response?.data) {
      achievementsList = response.data;
      meta = response.meta;
    }
  } catch (error) {
    console.error("Gagal mengambil data prestasi:", error);
  }

  return (
    <PrestasiTableClient 
      data={achievementsList}
      totalPages={meta.totalPages}
      currentPage={meta.page}
      totalItems={meta.total}
    />
  );
}
