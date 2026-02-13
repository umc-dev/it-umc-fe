import { PaginatedPartnershipResponse } from "@/types/partnership";

const API_URL = process.env.API_URL!;

interface GetPartnershipParams {
  limit?: number;
  page?: number;
  search?: string;
}

export async function getPartnerships({
  limit = 10,
  page = 1,
  search = "",
}: GetPartnershipParams = {}): Promise<PaginatedPartnershipResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    search,
  });

  const res = await fetch(`${API_URL}/partnerships?${params.toString()}`, {
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
