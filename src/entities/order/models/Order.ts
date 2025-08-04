import { User } from "@entities/user";
import { OrderProduct } from "./OrderProduct";
import { OrderStatus } from "./OrderStatus";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};
