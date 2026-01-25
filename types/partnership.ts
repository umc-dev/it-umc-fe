export interface Partnership {
  id: string;
  name: string;
  photo: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPartnershipResponse {
  data: Partnership[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
