import { Dosen, DosenPagination } from "@/types/dosen";

const API_URL = process.env.API_URL!;

/**
 * Mengambil daftar dosen dengan pagination & search
 */
export async function getDosen(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<DosenPagination> {
  const searchParams = new URLSearchParams();

  const limit = params?.limit ?? 6;
  const page = params?.page ?? 1;

  searchParams.set("limit", limit.toString());
  searchParams.set("page", page.toString());

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const res = await fetch(`${API_URL}/dosen?${searchParams.toString()}`, {
    next: { revalidate: 60 }, // 1 menit
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dosen list");
  }

  const result = await res.json();
  return result as DosenPagination;
}

/**
 * Mengambil detail dosen berdasarkan ID
 */
export async function getDosenDetail(id: string): Promise<Dosen | null> {
  const res = await fetch(`${API_URL}/dosen/${id}`, {
    next: { revalidate: 3600 }, // 1 jam
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch dosen detail");
  }

  const result = await res.json();
  return result.data as Dosen;
}