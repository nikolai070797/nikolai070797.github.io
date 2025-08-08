import { Product } from "./Product";

export type ProductsResult = {
  data: Product[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  }
}