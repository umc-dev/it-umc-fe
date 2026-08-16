export interface PartnershipFileItem {
  id: string;
  partnershipId: string;
  fileName: string;
  fileUrl: string;
  fileType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Partnership {
  id: string;
  name: string;
  photo: string | null;
  description?: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  files?: PartnershipFileItem[];
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
