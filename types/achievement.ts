export interface Achievement {
  id: number;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: string;
  prodi?: "S1" | "D3";
  createdAt: string;
  updatedAt: string;
}

export interface AchievementPagination {
  success: boolean;
  message: string;
  data: Achievement[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
