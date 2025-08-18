import { IAccountRepository } from '../model/interfaces';
import { UserType, ProductType } from '../model/types';

export class AccountService {
  constructor(private repository: IAccountRepository) {}

  async setUserDiscount(userType: UserType, discount: number): Promise<void> {
    if (discount < 0 || discount > 100) {
      throw new Error('Скидка должна быть в диапазоне от 0 до 100');
    }
    await this.repository.setUserDiscount(userType, discount);
  }

  async getUserDiscount(userType: UserType): Promise<number> {
    return await this.repository.getUserDiscount(userType);
  }

  async setProductDiscount(userType: UserType, productType: ProductType, discount: number): Promise<void> {
    if (discount < 0 || discount > 100) {
      throw new Error('Скидка должна быть в диапазоне от 0 до 100');
    }
    await this.repository.setProductDiscount(userType, productType, discount);
  }

  async getProductDiscount(userType: UserType, productType: ProductType): Promise<number> {
    return await this.repository.getProductDiscount(userType, productType);
  }

  async calculateTotalDiscount(userType: UserType, productType: ProductType): Promise<number> {
    const userDiscount = await this.getUserDiscount(userType);
    const productDiscount = await this.getProductDiscount(userType, productType);

    // Ограничиваем максимальную скидку 100%
    const total = userDiscount + productDiscount;
    return Math.min(total, 100);
  }

  async getAllUserDiscounts(): Promise<Array<{ userType: UserType; discount: number }>> {
    return await this.repository.getAllUserDiscounts();
  }

  async getAllProductDiscounts(): Promise<Array<{ userType: UserType; productType: ProductType; discount: number }>> {
    return await this.repository.getAllProductDiscounts();
  }
}
