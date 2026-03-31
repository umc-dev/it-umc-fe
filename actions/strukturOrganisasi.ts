import { StrukturOrganisasiResponse } from "@/types/strukturOrganisasi";

const API_URL = process.env.API_URL!;

export async function getStrukturOrganisasi(): Promise<StrukturOrganisasiResponse> {
  try {
    const res = await fetch(`${API_URL}/organizational-structure`, {
      next: {
        revalidate: 300, 
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { data: null };
      }
      return {
        data: null,
        message: "Gagal mengambil data struktur organisasi",
      };
    }

    return res.json();
  } catch {
    return {
      data: null,
      message: "Terjadi kesalahan saat mengambil struktur organisasi",
    };
  }
}
