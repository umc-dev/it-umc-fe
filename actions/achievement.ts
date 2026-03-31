import { AchievementPagination } from "@/types/achievement";

const API_URL = process.env.API_URL!;

export async function getAchievements(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<AchievementPagination> {
  const searchParams = new URLSearchParams();

  const limit = params?.limit ?? 10;
  const page = params?.page ?? 1;

  searchParams.set("limit", limit.toString());
  searchParams.set("page", page.toString());

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const res = await fetch(`${API_URL}/achievement?${searchParams.toString()}`, {
    next: { revalidate: 60 }, // 1 menit
  });

  if (!res.ok) {
    throw new Error("Failed to fetch achievements list");
  }

  const result = await res.json();
  return result as AchievementPagination;
}
