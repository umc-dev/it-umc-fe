export interface Dosen {
  id: string;
  name: string;
  expertise: string;
  photo: string;
  teaching: string;
  research: string;
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
