import { News } from "./news";

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedCategoryResponse {
  data: Category[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoryAPIResponse {
  success: boolean;
  message: string;
  data: CategoryWithNewsResponse;
}

export interface CategoryWithNewsResponse extends Category {
  news: News[];
}
