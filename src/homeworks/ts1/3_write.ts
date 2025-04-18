import { v4 as uuid } from 'uuid';
import { fakerRU as faker } from '@faker-js/faker';

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  return {
    id: uuid(),
    name: faker.commerce.productName(),
    photo: faker.image.url({ width: 640, height: 480 }),
    desc: faker.lorem.sentence(),
    createdAt,
    price: parseFloat(faker.commerce.price()),
    oldPrice: Math.random() > 0.5 ? parseFloat(faker.commerce.price()) : undefined,
    category: {
      id: uuid(),
      name: faker.commerce.department(),
      photo: Math.random() > 0.5 ? faker.image.url({ width: 100, height: 100 }) : undefined,
    },
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const type = faker.helpers.arrayElement(['Cost', 'Profit']) as 'Cost' | 'Profit';

  return {
    id: uuid(),
    name: faker.finance.transactionDescription(),
    desc: faker.lorem.sentence(),
    createdAt,
    amount: faker.number.int({ min: 100, max: 10000 }),
    category: {
      id: uuid(),
      name: type === 'Cost' ? 'Расходы' : 'Доходы',
      photo: Math.random() > 0.5 ? faker.image.url({ width: 100, height: 100 }) : undefined,
    },
    type,
  };
};
