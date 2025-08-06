import { OrderStatus } from "./OrderStatus";

export type OrderParams = {
  productIds: string[];
  status: OrderStatus;
};