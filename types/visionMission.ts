export interface VisionMission {
  id: number;
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedVisionMissionResponse {
  data: VisionMission[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}