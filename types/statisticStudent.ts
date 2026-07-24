export interface StatisticStudent {
  id: string;
  year: number;
  enteredStudents: number;
  graduatedStudents: number;
  prodi?: "S1" | "D3";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStatisticStudentResponse {
  data: StatisticStudent[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}