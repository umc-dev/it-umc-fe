"use server";

import { PaginatedAlumniResponse } from "@/types/alumni";

const API_URL = process.env.API_URL || "http://localhost:9090/api/v1";

interface GetAlumniParams {
  limit?: number;
  page?: number;
  search?: string;
  prodi?: string;
}

interface ApiResponseErrorItem {
  message?: string;
}

interface ApiResponsePayload {
  message?: string;
  errors?: ApiResponseErrorItem[];
  data?: unknown;
}

export async function getAlumni({
  limit = 6,
  page = 1,
  search = "",
  prodi,
}: GetAlumniParams = {}): Promise<PaginatedAlumniResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    search,
  });

  if (prodi) {
    params.append("prodi", prodi);
  }

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

export async function submitPublicAlumni(formData: FormData) {
  try {
    // Clean up empty optional fields
    const photo = formData.get("photo");
    if (photo instanceof File && photo.size === 0) {
      formData.delete("photo");
    }

    const gradYear = formData.get("graduationYear");
    if (gradYear !== null && gradYear.toString().trim() === "") {
      formData.delete("graduationYear");
    }

    const res = await fetch(`${API_URL}/alumni/public`, {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("content-type");
    let json: ApiResponsePayload | null = null;

    if (contentType && contentType.includes("application/json")) {
      json = (await res.json()) as ApiResponsePayload;
    }

    if (!res.ok) {
      const errorMsg =
        json?.message ||
        (Array.isArray(json?.errors)
          ? json.errors.map((e: ApiResponseErrorItem) => e.message).filter(Boolean).join(", ")
          : null) ||
        "Gagal mengirimkan testimoni alumni.";
      throw new Error(errorMsg);
    }

    return json;
  } catch (error: unknown) {
    console.error("Error submitting public alumni:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}