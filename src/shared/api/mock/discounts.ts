import { IAccountRepository } from '@entities/account/model/interfaces';
import { UserType, ProductType, UserDiscount, ProductDiscount } from '@entities/account/model/types';

export class MockAccountRepository implements IAccountRepository {
  private userDiscounts: Map<UserType, number> = new Map();
  private productDiscounts: Map<string, number> = new Map();

  async getUserDiscount(userType: UserType): Promise<number> {
    return this.userDiscounts.get(userType) ?? 0;
  }

  async setUserDiscount(userType: UserType, discount: number): Promise<void> {
    this.userDiscounts.set(userType, discount);
  }

  async getProductDiscount(userType: UserType, productType: ProductType): Promise<number> {
    const key = `${userType}:${productType}`;
    return this.productDiscounts.get(key) ?? 0;
  }

  async setProductDiscount(userType: UserType, productType: ProductType, discount: number): Promise<void> {
    const key = `${userType}:${productType}`;
    this.productDiscounts.set(key, discount);
  }

  async getAllUserDiscounts(): Promise<UserDiscount[]> {
    const result: UserDiscount[] = [];
    for (const [userType, discount] of this.userDiscounts.entries()) {
      result.push({ userType, discount });
    }
    return result;
  }

  async getAllProductDiscounts(): Promise<ProductDiscount[]> {
    const result: ProductDiscount[] = [];
    for (const [key, discount] of this.productDiscounts.entries()) {
      const [userType, productType] = key.split(':') as [UserType, ProductType];
      result.push({ userType, productType, discount });
    }
    return result;
  }
}
