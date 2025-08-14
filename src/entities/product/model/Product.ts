import { Category } from '@entities/category'

export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  commandId: string;
  category: Category;
};

export type ProductPatch = {
  id: string;
  name?: string;
  photo?: string;
  desc?: string;
  createdAt?: string;
  oldPrice?: number;
  price?: number;
  category?: Category;
};
