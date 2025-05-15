import { ProductPreview } from '@entities/product';
import { createRandomProduct } from '@homeworks/ts1/3_write';

export const fetchProducts = async (page: number): Promise<ProductPreview[]> => {
  // Имитация задержки сети (1 секунда)
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: ProductPreview[] = [];
      for (let i = 1; i <= 3; i++) {
        products.push(createRandomProduct(`${new Date().toString()}-${page}-${i}`));
      }
      resolve(products);
    }, 1000);
  });
};