import { Product } from "./Product";

export type ProductPreview = Pick<Product, 'id' | 'name' | 'desc' | 'price' | 'oldPrice' | 'photo'>;
