import { Category } from '@entities/category';
import categoriesMock from '@shared/api/mock/categories.json';

// Получить товар по ID (временная реализация)
export const fetchCategoriesById = async (categoriesId: string[]): Promise<Category[] | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categoriesMock.filter((p) => categoriesId.includes(p.id)) as Category[];
      resolve(category);
    }, 0);
  });
};

export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesMock as Category[]);
    }, 1000);
  });
};

export const fetchRandomCategories = async (count: number): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categorys: Category[] = [];
      for (let i = 1; i <= count; i++) {
        const randomIndex = Math.floor(Math.random() * categoriesMock.length);
        categorys.push(categoriesMock[randomIndex] as Category);
      }
      resolve(categorys);
    }, 1000);
  });
};
