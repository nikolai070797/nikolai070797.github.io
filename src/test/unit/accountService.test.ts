import { ProductType, UserType } from '@entities/account/model/types';
import { AccountService } from '@entities/account/service/AccountService';
import { MockAccountRepository } from '@shared/api/mock/discounts';

describe('AccountService', () => {
  let accountService: AccountService;
  let mockRepository: MockAccountRepository;

  beforeEach(() => {
    mockRepository = new MockAccountRepository();
    accountService = new AccountService(mockRepository);
  });

  // Тесты для установки правильных общих скидок для каждого типа пользователей
  describe('User Discount Management', () => {
    it('должен устанавливать и получать скидку для Standard пользователя', async () => {
      await accountService.setUserDiscount(UserType.Standard, 5);
      const discount = await accountService.getUserDiscount(UserType.Standard);
      expect(discount).toBe(5);
    });

    it('должен устанавливать и получать скидку для Premium пользователя', async () => {
      await accountService.setUserDiscount(UserType.Premium, 10);
      const discount = await accountService.getUserDiscount(UserType.Premium);
      expect(discount).toBe(10);
    });

    it('должен устанавливать и получать скидку для Gold пользователя', async () => {
      await accountService.setUserDiscount(UserType.Gold, 15);
      const discount = await accountService.getUserDiscount(UserType.Gold);
      expect(discount).toBe(15);
    });

    it('должен устанавливать и получать скидку для Free пользователя', async () => {
      await accountService.setUserDiscount(UserType.Free, 0);
      const discount = await accountService.getUserDiscount(UserType.Free);
      expect(discount).toBe(0);
    });

    it('должен возвращать 0 для пользователя без установленной скидки', async () => {
      const discount = await accountService.getUserDiscount(UserType.Standard);
      expect(discount).toBe(0);
    });

    it('должен выбрасывать ошибку при установке отрицательной скидки', async () => {
      await expect(accountService.setUserDiscount(UserType.Standard, -5)).rejects.toThrow(
        'Скидка должна быть в диапазоне от 0 до 100'
      );
    });

    it('должен выбрасывать ошибку при установке скидки больше 100', async () => {
      await expect(accountService.setUserDiscount(UserType.Standard, 105)).rejects.toThrow(
        'Скидка должна быть в диапазоне от 0 до 100'
      );
    });
  });

  // Тесты для установки правильных скидок для конкретных типов товаров и пользователей
  describe('Product Discount Management', () => {
    it('должен устанавливать и получать скидку на Car для Standard пользователя', async () => {
      await accountService.setProductDiscount(UserType.Standard, ProductType.Car, 3);
      const discount = await accountService.getProductDiscount(UserType.Standard, ProductType.Car);
      expect(discount).toBe(3);
    });

    it('должен устанавливать и получать скидку на Food для Premium пользователя', async () => {
      await accountService.setProductDiscount(UserType.Premium, ProductType.Food, 7);
      const discount = await accountService.getProductDiscount(UserType.Premium, ProductType.Food);
      expect(discount).toBe(7);
    });

    it('должен устанавливать и получать скидку на Toy для Gold пользователя', async () => {
      await accountService.setProductDiscount(UserType.Gold, ProductType.Toy, 12);
      const discount = await accountService.getProductDiscount(UserType.Gold, ProductType.Toy);
      expect(discount).toBe(12);
    });

    it('должен возвращать 0 для товара без установленной скидки', async () => {
      const discount = await accountService.getProductDiscount(UserType.Standard, ProductType.Car);
      expect(discount).toBe(0);
    });

    it('должен выбрасывать ошибку при установке отрицательной скидки на товар', async () => {
      await expect(accountService.setProductDiscount(UserType.Standard, ProductType.Car, -10)).rejects.toThrow(
        'Скидка должна быть в диапазоне от 0 до 100'
      );
    });

    it('должен выбрасывать ошибку при установке скидки больше 100 на товар', async () => {
      await expect(accountService.setProductDiscount(UserType.Standard, ProductType.Car, 150)).rejects.toThrow(
        'Скидка должна быть в диапазоне от 0 до 100'
      );
    });
  });

  // Тесты для правильного суммирования общего и товарного числа скидок
  describe('Discount Calculation', () => {
    it('должен правильно суммировать общую и товарную скидку', async () => {
      await accountService.setUserDiscount(UserType.Gold, 10);
      await accountService.setProductDiscount(UserType.Gold, ProductType.Food, 15);
      const totalDiscount = await accountService.calculateTotalDiscount(UserType.Gold, ProductType.Food);
      expect(totalDiscount).toBe(25);
    });

    it('должен возвращать только общую скидку, если нет скидки на товар', async () => {
      await accountService.setUserDiscount(UserType.Free, 5);
      const totalDiscount = await accountService.calculateTotalDiscount(UserType.Free, ProductType.Toy);
      expect(totalDiscount).toBe(5);
    });

    it('должен возвращать только товарную скидку, если нет общей скидки', async () => {
      await accountService.setProductDiscount(UserType.Standard, ProductType.Car, 8);
      const totalDiscount = await accountService.calculateTotalDiscount(UserType.Standard, ProductType.Car);
      expect(totalDiscount).toBe(8);
    });

    it('должен возвращать 0, если нет никаких скидок', async () => {
      const totalDiscount = await accountService.calculateTotalDiscount(UserType.Standard, ProductType.Car);
      expect(totalDiscount).toBe(0);
    });

    it('должен ограничивать общую скидку 100%', async () => {
      await accountService.setUserDiscount(UserType.Premium, 60);
      await accountService.setProductDiscount(UserType.Premium, ProductType.Food, 50);
      const totalDiscount = await accountService.calculateTotalDiscount(UserType.Premium, ProductType.Food);
      expect(totalDiscount).toBe(100); // Не больше 100%
    });

    it('должен корректно работать при скидке 0', async () => {
      await accountService.setUserDiscount(UserType.Standard, 0);
      await accountService.setProductDiscount(UserType.Standard, ProductType.Food, 0);
      const total = await accountService.calculateTotalDiscount(UserType.Standard, ProductType.Food);
      expect(total).toBe(0);
    });
  });

  // Тесты для методов получения всех скидок
  describe('Get All Discounts', () => {
    it('должен возвращать все пользовательские скидки', async () => {
      await accountService.setUserDiscount(UserType.Standard, 5);
      await accountService.setUserDiscount(UserType.Premium, 10);

      const discounts = await accountService.getAllUserDiscounts();
      expect(discounts).toHaveLength(2);
      expect(discounts).toEqual(
        expect.arrayContaining([
          { userType: UserType.Standard, discount: 5 },
          { userType: UserType.Premium, discount: 10 },
        ])
      );
    });

    it('должен возвращать все товарные скидки', async () => {
      await accountService.setProductDiscount(UserType.Gold, ProductType.Car, 15);
      await accountService.setProductDiscount(UserType.Free, ProductType.Food, 3);

      const discounts = await accountService.getAllProductDiscounts();
      expect(discounts).toHaveLength(2);
      expect(discounts).toEqual(
        expect.arrayContaining([
          { userType: UserType.Gold, productType: ProductType.Car, discount: 15 },
          { userType: UserType.Free, productType: ProductType.Food, discount: 3 },
        ])
      );
    });
  });
});
