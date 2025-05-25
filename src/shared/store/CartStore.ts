import { Product } from '@entities/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  product: Product;
  quantity: number;
};

export type CartStoreProps = {
  cartItems: CartItem[];
  addProduct: (product: Product) => void;
  decrementProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStoreProps>()(
  persist(
    (set) => ({
      cartItems: [],

      addProduct: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { product, quantity: 1 }],
          };
        }),

      decrementProduct: (productId) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.product.id === productId);
          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                cartItems: state.cartItems.map((item) =>
                  item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                ),
              };
            }
            return {
              cartItems: state.cartItems.filter((item) => item.product.id !== productId),
            };
          }
          return state;
        }),

      removeProduct: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.product.id !== productId),
        })),

      clear: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-store', // Имя хранилища
      version: 1, // Версия хранилища
    }
  )
);

// Хук для получения общего количества товаров в корзине
export const useCartCount = () => {
  const { cartItems } = useCartStore();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
