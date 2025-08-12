import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { FieldType } from '@shared/lib/types';
import { Category } from '../model/Category';
import { CategoryFilters } from '../model/CategoryFilters';
import { CategoryResult } from '../model/CategoryResult'; // Импортируем CategoriesResult
import { CategoryParams, CategoryPatch } from '../model/CategoryParams';

export interface RequestOptions {
  signal?: AbortSignal;
}

export const categoryApi = {
  /** Получить категорию по ID */
  getById: (id: FieldType<Category, 'id'>, options?: RequestOptions): Promise<Category> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.get<Category>(`/categories/${id}`, config).then((res) => res.data);
  },

  /** Список категорий с опциональными фильтрами */
  list: (filters?: CategoryFilters, options?: RequestOptions): Promise<CategoryResult> => {
    // Сериализация сложных фильтров в JSON
    const processedFilters: Record<string, any> = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Сериализуем вложенные объекты, как в productApi
          if (['pagination', 'sorting', 'createdAt', 'updatedAt', 'ids'].includes(key)) {
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

    return axios.get<CategoryResult>('/categories', config).then((res) => res.data);
  },

  /** Создать новую категорию */
  create: (data: CategoryParams, options?: RequestOptions): Promise<Category> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.post<Category>('/categories', data, config).then((res) => res.data);
  },

  /** Полное обновление категории по ID */
  update: (id: FieldType<Category, 'id'>, data: CategoryParams, options?: RequestOptions): Promise<Category> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.put<Category>(`/categories/${id}`, data, config).then((res) => res.data);
  },

  /** Частичное обновление категории по ID */
  partialUpdate: (id: FieldType<Category, 'id'>, patch: CategoryPatch, options?: RequestOptions): Promise<Category> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.patch<Category>(`/categories/${id}`, patch, config).then((res) => res.data);
  },

  /** Удалить категорию по ID */
  delete: (id: FieldType<Category, 'id'>, options?: RequestOptions): Promise<void> => {
    const config: AxiosRequestConfig = { signal: options?.signal };
    return axios.delete(`/categories/${id}`, config).then((res) => res.data);
  },
};
