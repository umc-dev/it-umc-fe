export interface Study {
  id: number;
  source: string;
  prodi?: "S1" | "D3";
  createdAt: string;
  updatedAt: string;
}

export interface StudyPagination {
  data: Study[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
