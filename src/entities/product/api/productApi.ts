import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { FieldType } from '@shared/lib/types';
import { Product, ProductPatch } from '../model/Product';
import { ProductFilters } from '../model/ProductFilters';
import { ProductsResult } from '../model/ProductsResult';
import { ProductParams } from '../model/ProductParams';

export interface RequestOptions {
  signal?: AbortSignal;
}

export const productApi = {
  /** Получить продукт по ID */
  getById: (id: FieldType<Product, 'id'>, options?: RequestOptions): Promise<Product> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.get<Product>(`/products/${id}`, config).then((res) => res.data);
  },

  /** Список продуктов с опциональными фильтрами */
  list: (filters?: ProductFilters, options?: RequestOptions): Promise<ProductsResult> => {
    // Сериализация сложных фильтров в JSON
    const processedFilters: Record<string, any> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (['pagination', 'sorting', 'ids', 'categoryIds', 'createdAt', 'updatedAt', 'name'].includes(key)) {
            processedFilters[key] = JSON.stringify(value);
          } else {
            processedFilters[key] = value;
          }
        }
      });
    }

    const config: AxiosRequestConfig = {
      params: processedFilters,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets', skipNulls: true }),
      signal: options?.signal,
    };

    return axios.get<ProductsResult>('/products', config).then((res) => res.data);
  },

  /** Создать новый продукт */
  create: (data: ProductParams, options?: RequestOptions): Promise<Product> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.post<Product>('/products', data, config).then((res) => res.data);
  },

  /** Полное обновление продукта по ID */
  update: (id: FieldType<Product, 'id'>, data: ProductParams, options?: RequestOptions): Promise<Product> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.put<Product>(`/products/${id}`, data, config).then((res) => res.data);
  },

  /** Частичное обновление продукта по ID */
  partialUpdate: (id: FieldType<Product, 'id'>, patch: ProductPatch, options?: RequestOptions): Promise<Product> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.patch<Product>(`/products/${id}`, patch, config).then((res) => res.data);
  },

  /** Удалить продукт по ID */
  delete: (id: FieldType<Product, 'id'>, options?: RequestOptions): Promise<void> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.delete(`/products/${id}`, config).then((res) => res.data);
  },
};
