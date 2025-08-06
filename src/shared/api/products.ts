import { Product, ProductPreview } from '@entities/product';
import { createRandomProduct } from '@homeworks/ts1/3_write';
import productsMock from '@shared/api/mock/products.json';

// Получить товар по ID (временная реализация)
export const fetchProductsById = async (productsId: string[]): Promise<Product[] | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsMock.filter((p) => productsId.includes(p.id)) as Product[];
      resolve(product);
    }, 0);
  });
};

export const fetchProducts = async (page: number, count: number): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = [];
      for (let i = 1; i <= count; i++) {
        const randomIndex = Math.floor(Math.random() * productsMock.length);
        products.push(productsMock[randomIndex] as Product);
      }
      resolve(products);
    }, 0);
  });
};

// export const fetchProducts = async (page: number, count: number): Promise<Product[]> => {
//   // Имитация задержки сети (1 секунда)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const products: Product[] = [];
//       for (let i = 1; i <= count; i++) {
//         products.push(createRandomProduct(`${new Date().toString()}-${page}-${i}`));
//       }
//       resolve(products);
//     }, 1000);
//   });
// };
