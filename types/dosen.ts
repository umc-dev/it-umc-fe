export interface LectureshipRef {
  id: number;
  name: string;
}

export interface DosenPosition {
  id: number;
  startDate: string;
  endDate: string | null;
  lectureship: LectureshipRef;
}

export interface Dosen {
  id: string;
  name: string;
  nidn: string | null;
  expertise: string;
  photo: string | null;
  teaching: string;
  research: string;
  education?: string | null;
  description?: string | null;
  prodi?: "S1" | "D3";
  createdAt: string;
  updatedAt: string;
  positions: DosenPosition[];
  dosenTridharmas?: DosenTridharma[];
}

export interface DosenTridharma {
  id: number;
  dosenId: string;
  category: "PENGAJARAN" | "PENELITIAN" | "PENGABDIAN";
  title: string;
  year: number;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface DosenPagination {
  success: boolean;
  message: string;
  data: Dosen[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}