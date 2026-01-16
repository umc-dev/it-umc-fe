import {
  CategoryAPIResponse,
  CategoryWithNewsResponse,
  PaginatedCategoryResponse,
} from "@/types/category";

const API_URL = process.env.API_URL!;

/**
 * Get all categories (with pagination)
 */
export async function getCategories(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedCategoryResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);

  const res = await fetch(`${API_URL}/category?${searchParams.toString()}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

/**
 * Get category detail + news inside it
 */

export async function getCategoryBySlug(params: {
  slug: string;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<CategoryAPIResponse> {
  const { slug, page, limit, search } = params;

  const searchParams = new URLSearchParams();
  if (page) searchParams.set("page", String(page));
  if (limit) searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);

  const res = await fetch(
    `${API_URL}/category/${slug}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category by slug");
  }

  const result = res.json();

  return result;
}
