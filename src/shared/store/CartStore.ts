import { Product } from '@entities/product';
import { create } from 'zustand';
import { persistNSync } from 'persist-and-sync';

// Тип элемента корзины: хранит только ID и количество
type CartItemStoreProps = {
  productId: string;
  quantity: number;
};

export type CartStoreProps = {
  cartItems: CartItemStoreProps[];

  // Методы для работы с корзиной
  addProduct: (product: Product) => void;
  decrementProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clear: () => void;

  // Новый метод для установки количества товара
  setQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartStoreProps>()(
  persistNSync(
    (set) => ({
      cartItems: [],

      addProduct: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.productId === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { productId: product.id, quantity: 1 }],
          };
        }),

      decrementProduct: (productId) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.productId === productId);
          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                cartItems: state.cartItems.map((item) =>
                  item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                ),
              };
            }
            return {
              cartItems: state.cartItems.filter((item) => item.productId !== productId),
            };
          }
          return state;
        }),

      removeProduct: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== productId),
        })),

      clear: () => set({ cartItems: [] }),

      // Новый метод: установка конкретного количества товара
      setQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter((item) => item.productId !== productId),
            };
          }
          const existingItem = state.cartItems.find((item) => item.productId === productId);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
            };
          }
          return state;
        }),
    }),
    {
      name: 'cart-store',
      // version: 2,
    }
  )
);

// Хук для получения общего количества товаров в корзине
export const useCartCount = () => {
  const { cartItems } = useCartStore();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
