import { notFound } from "next/navigation";
import type { News, NewsPagination } from "@/types/news";

const API_URL = process.env.API_URL!;

/**
 * Get list news with pagination & search
 */
export async function getNews(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const searchParams = new URLSearchParams();

  const limit = params?.limit ?? 6;
  const page = params?.page ?? 1;

  searchParams.set("limit", limit.toString());
  searchParams.set("page", page.toString());

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const res = await fetch(`${API_URL}/news?${searchParams.toString()}`, {
    next: { revalidate: 300 }, // ISR 5 menit
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news list");
  }

  return res.json() as Promise<NewsPagination>;
}

/**
 * Get news detail by slug
 */
export async function getNewsDetail(slug: string): Promise<News | null> {
  const res = await fetch(`${API_URL}/news/${slug}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch news detail");
  }

  // Ambil json utuh dari API
  const result = await res.json();

  return result.data as News;
}
