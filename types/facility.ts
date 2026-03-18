export interface FacilityResponse {
  id: number;
  name: string;
  description: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedFacilityResponse {
  data: FacilityResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
