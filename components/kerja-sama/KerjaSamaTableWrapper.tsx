import { getPartnerships } from "@/actions/partnerships";
import KerjaSamaTableClient from "@/components/kerja-sama/KerjaSamaTableClient";
import type { Partnership } from "@/types/partnership";

export default async function KerjaSamaTableWrapper({ 
  search, 
  page 
}: { 
  search: string; 
  page: number 
}) {
  let partnershipsList: Partnership[] = [];
  let meta = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  try {
    const response = await getPartnerships({ limit: 10, page, search });
    
    if (response?.data) {
      partnershipsList = response.data;
      meta = response.meta;
    }
  } catch (error) {
    console.error("Gagal mengambil data kerja sama:", error);
  }

  return (
    <KerjaSamaTableClient 
      data={partnershipsList}
      totalPages={meta.totalPages}
      currentPage={meta.page}
      totalItems={meta.total}
    />
  );
}
