import { User, UserDiscount, ProductDiscount, UserType, ProductType } from './types';

export interface IAccountRepository {
  getUserDiscount(userType: UserType): Promise<number>;
  setUserDiscount(userType: UserType, discount: number): Promise<void>;
  getProductDiscount(userType: UserType, productType: ProductType): Promise<number>;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): Promise<void>;
  getAllUserDiscounts(): Promise<UserDiscount[]>;
  getAllProductDiscounts(): Promise<ProductDiscount[]>;
}
