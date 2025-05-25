import { Product, ProductPreview } from '@entities/product';
import { createRandomProduct } from '@homeworks/ts1/3_write';

export const fetchProducts = async (page: number, count: number): Promise<Product[]> => {
  // Имитация задержки сети (1 секунда)
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = [];
      for (let i = 1; i <= count; i++) {
        products.push(createRandomProduct(`${new Date().toString()}-${page}-${i}`));
      }
      resolve(products);
    }, 1000);
  });
};
