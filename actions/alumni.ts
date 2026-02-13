import { PaginatedAlumniResponse } from "@/types/alumni";

const API_URL = process.env.API_URL!;

interface GetAlumniParams {
  limit?: number;
  page?: number;
  search?: string;
}

export async function getAlumni({
  limit = 6,
  page = 1,
  search = "",
}: GetAlumniParams = {}): Promise<PaginatedAlumniResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    search,
  });

  try {
    const res = await fetch(`${API_URL}/alumni?${params.toString()}`, {
      next: {
        revalidate: 60, // Revalidate setiap 1 menit
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch alumni:", res.statusText);
      return {
        data: [],
        meta: { page: 1, limit, total: 0, totalPages: 0 },
      };
    }

    // Backend membungkus response dalam format { status, message, data, meta }
    // Kita perlu menyesuaikan parsingnya berdasarkan controller backend Anda:
    // res.json(ResponseHTTP.ok(result.data, 'Alumni fetched', result.meta))
    const json = await res.json();
    
    return {
      data: json.data || [],
      meta: json.meta || { page: 1, limit, total: 0, totalPages: 0 }
    };

  } catch (error) {
    console.error("Error fetching alumni:", error);
    return {
      data: [],
      meta: { page: 1, limit, total: 0, totalPages: 0 },
    };
  }
}