import { PaginatedAccreditationResponse } from "@/types/accreditation";

const API_URL = process.env.API_URL || "http://localhost:9090/api/v1";

interface GetAccreditationParams {
  category?: string;
  prodi?: string;
  search?: string;
}

export async function getAccreditations({
  category,
  prodi,
  search = "",
}: GetAccreditationParams = {}): Promise<PaginatedAccreditationResponse> {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (prodi) params.append("prodi", prodi);
  if (search) params.append("search", search);

  try {
    const res = await fetch(`${API_URL}/accreditations?${params.toString()}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch accreditations:", res.statusText);
      return { data: [] };
    }

    const json = await res.json();
    return {
      data: json.data || [],
      meta: json.meta,
    };
  } catch (error) {
    console.error("Error fetching accreditations:", error);
    return { data: [] };
  }
}
