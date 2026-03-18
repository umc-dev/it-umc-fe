import { PaginatedFacilityResponse } from "@/types/facility";

const API_URL = process.env.API_URL!;

interface GetFacilityParams {
  limit?: number;
  page?: number;
  search?: string;
}

export async function getFacilities({
  limit = 25,
  page = 1,
  search = "",
}: GetFacilityParams = {}): Promise<PaginatedFacilityResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    search,
  });

  const res = await fetch(`${API_URL}/facilities?${params.toString()}`, {
    next: {
      revalidate: 60, // ISR 1 menit
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
