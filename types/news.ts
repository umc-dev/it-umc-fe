import { Admin } from "./admin";
import { Category } from "./category";

export interface News {
  id: string;
  title: string;
  content: string;
  authorId: string;
  thumbnail: string;
  slug: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  admin: Admin;
  category: Category;
}

export type NewsPagination = {
  data: News[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
