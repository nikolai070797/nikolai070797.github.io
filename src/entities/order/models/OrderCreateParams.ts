import { OrderStatus } from "./OrderStatus";

export type OrderCreateParams = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};