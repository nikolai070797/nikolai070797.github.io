import axios from 'axios';
import { FieldType } from '@shared/lib/types';
import { Product, ProductPatch } from '../model/Product';
import { ProductFilters } from '../model/ProductFilters';
import { ProductsResult } from '../model/ProductsResult';
import { ProductParams } from '../model/ProductParams';

export const productApi = {
  getProductById: async (id: FieldType<Product, 'id'>): Promise<Product> => {
    const response = await axios.get<Product>('/products', { params: id });
    return response.data;
  },

  getProducts: async (filters?: ProductFilters): Promise<ProductsResult> => {
    const processedFilters: Record<string, any> = {};

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = (filters as any)[key];
        if (value !== undefined) {
          // Сериализуем только определённые поля в JSON
          if (['pagination', 'sorting', 'ids', 'categoryIds', 'createdAt', 'updatedAt'].includes(key) && typeof value === 'object') {
            processedFilters[key] = JSON.stringify(value);
          } else {
            processedFilters[key] = value;
          }
        }
      });
    }

    const response = await axios.get<ProductsResult>('/products', {
      params: processedFilters,
      paramsSerializer: (params) => new URLSearchParams(params).toString(),
    });
    return response.data;
  },

  createProduct: async (newProduct: ProductParams): Promise<Product> => {
    const response = await axios.post<Product>('/products', { params: newProduct });
    return response.data;
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const response = await axios.put<Product>('/products', { params: product });
    return response.data;
  },

  patchProduct: async (productPatch: ProductPatch): Promise<Product> => {
    const response = await axios.patch<Product>('/products', { params: productPatch });
    return response.data;
  },

  deleteProduct: async (id: string): Promise<Product> => {
    const response = await axios.delete<Product>('/products', { params: id });
    return response.data;
  },
};
