import { ProductForm } from '@entities/product';
import { fetchCategories, fetchRandomCategories } from '@shared/api/categories';
import { fetchProducts } from '@shared/api/products';
import type { Meta, StoryObj } from '@storybook/react';

const mockCategories = await fetchCategories();
const mockProduct = await fetchProducts(1, 1);

const meta: Meta<typeof ProductForm> = {
  component: ProductForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProductForm>;

// Базовая история
export const Default: Story = {
  args: {
    categories: mockCategories,
    loading: false,
  },
};

// История с предзаполненными данными
export const WithDefaultValues: Story = {
  args: {
    categories: mockCategories,
    defaultValues: mockProduct[0],

    loading: false,
  },
};

// История с загрузкой
export const Loading: Story = {
  args: {
    categories: [],
    loading: true,
  },
};

// История с ошибками валидации
export const WithErrors: Story = {
  args: {
    categories: mockCategories,
    defaultValues: {
      ...mockProduct,
      name: '',
      price: -100,
      id: '',
      photo: '',
      createdAt: new Date(''),
      category: {
        id: '',
        name: '',
        photo: undefined,
        createdAt: new Date(''),
        updatedAt: new Date(''),
        commandId: ''
      },
      updatedAt: new Date(''),
      commandId: ''
    },
    loading: false,
  },
  parameters: {
    // Для принудительного отображения ошибок
    docs: {
      source: {
        code: 'forceShowErrors = true',
      },
    },
  },
};
