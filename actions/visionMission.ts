import { PaginatedVisionMissionResponse } from "@/types/visionMission";

const API_URL = process.env.API_URL!;

interface GetVisionMissionParams {
  limit?: number;
  page?: number;
  search?: string;
}

export async function getVisionMission({
  limit = 1, // Default 1 karena biasanya Visi Misi hanya ada 1 yang aktif
  page = 1,
  search = "",
}: GetVisionMissionParams = {}): Promise<PaginatedVisionMissionResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    search,
  });

  const res = await fetch(`${API_URL}/vision-mission?${params.toString()}`, {
    next: {
      revalidate: 300, // ISR 5 menit 
    },
  });

  if (!res.ok) {
    return {
      data: [],
      meta: {
        page: 1,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }

  return res.json();
}