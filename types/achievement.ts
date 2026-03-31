export interface Achievement {
  id: number;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: string;
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
