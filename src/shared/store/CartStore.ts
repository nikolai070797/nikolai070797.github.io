// import { Product } from '@entities/product';
import { create } from 'zustand';

export type CartStoreProps = {
  productsId: string[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStoreProps>((set) => ({
  productsId: [],

  // Добавляем товар (можно добавить логику учета количества одинаковых товаров)
  addProduct: (productId) =>
    set((state) => ({
      productsId: [...state.productsId, productId],
    })),

  // Удаляем товар по ID
  // removeProduct: (productId) => set((state) => ({
  removeProduct: () =>
    set((state) => ({
      // products: state.products.filter(p => p.id !== productId)
      productsId: state.productsId.slice(0, -1),
    })),

  // Очищаем корзину
  clear: () => set({ productsId: [] }),
}));

// Хук для получения количества товаров
export const useCartCount = () => {
  const { productsId } = useCartStore();
  return productsId.length;
};
