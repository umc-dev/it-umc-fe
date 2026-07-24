import { StudyPagination } from "@/types/studies";

const API_URL = process.env.API_URL!;

export async function getStudies(params?: { prodi?: "S1" | "D3" }): Promise<StudyPagination> {
  const searchParams = new URLSearchParams({ limit: "1" });
  if (params?.prodi) {
    searchParams.set("prodi", params.prodi);
  }
  // Hanya ambil limit 1 atau default karena umumnya distribusi mata kuliah cuma 1 dokumen aktif
  const res = await fetch(`${API_URL}/studies?${searchParams.toString()}`, {
    next: { revalidate: 60 }, // Cache 1 menit
  });

  if (!res.ok) {
    if (res.status === 404) {
        return { data: [], meta: { page: 1, limit: 1, total: 0, totalPages: 0 } };
    }
    throw new Error("Failed to fetch distribusi mata kuliah data");
  }

  const result = await res.json();
  return result as StudyPagination;
}
