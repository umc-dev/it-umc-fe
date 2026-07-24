import { PaginatedStatisticStudentResponse } from "@/types/statisticStudent";

const API_URL = process.env.API_URL!;

interface GetStatisticParams {
  limit?: number;
  page?: number;
  search?: number; // Search by year based on controller
  prodi?: "S1" | "D3";
}

export async function getStatisticStudents({
  limit = 100, // Ambil banyak supaya grafiknya lengkap
  page = 1,
  search,
  prodi,
}: GetStatisticParams = {}): Promise<PaginatedStatisticStudentResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  if (search) {
    params.append("search", String(search));
  }

  if (prodi) {
    params.set("prodi", prodi);
  }

  const res = await fetch(`${API_URL}/statistic-student?${params.toString()}`, {
    next: {
      revalidate: 60, // Revalidate setiap 1 menit
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