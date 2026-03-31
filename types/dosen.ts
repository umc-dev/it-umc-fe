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
  createdAt: string;
  updatedAt: string;
  positions: DosenPosition[];
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