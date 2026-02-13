export interface Alumni {
  id: string;
  name: string;
  photo?: string | null; // URL foto alumni
  video: string | null; // URL video (bisa YouTube atau direct link)
  message: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export type PaginatedAlumniResponse = {
  data: Alumni[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};