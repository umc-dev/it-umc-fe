import { StrukturOrganisasiResponse } from "@/types/strukturOrganisasi";

const API_URL = process.env.API_URL!;

export async function getStrukturOrganisasi(prodi?: string): Promise<StrukturOrganisasiResponse> {
  try {
    const url = prodi 
      ? `${API_URL}/organizational-structure?prodi=${prodi.toUpperCase()}` 
      : `${API_URL}/organizational-structure`;
    const res = await fetch(url, {
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
