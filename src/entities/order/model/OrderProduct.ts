import { Product } from "@entities/product";

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
}
