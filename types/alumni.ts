export interface Alumni {
  id: string;
  name: string;
  photo?: string | null;
  workplace?: string | null;
  position?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  video: string | null;
  message: string;
  year: number;
  graduationYear?: number | null;
  prodi: "S1" | "D3";
  isApproved?: boolean;
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