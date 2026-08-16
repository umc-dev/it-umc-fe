import { PaginatedPartnershipResponse, Partnership } from "@/types/partnership";

const API_URL = process.env.API_URL || "http://localhost:9090/api/v1";

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

export async function getPartnershipById(id: string): Promise<Partnership | null> {
  try {
    const res = await fetch(`${API_URL}/partnerships/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching partnership by id:", error);
    return null;
  }
}
