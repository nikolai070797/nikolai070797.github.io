import { useState } from 'react';
import { ProductPreview } from '@entities/product';
import { ProductList } from '@features/ProductList';
import { createRandomProduct } from '@homeworks/ts1/3_write';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof ProductList> = {
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProductList>;

const createInitialProducts = () => {
  const products: ProductPreview[] = [];
  for (let i = 1; i <= 3; i++) {
    products.push(createRandomProduct(new Date().toString()));
  }
  return products;
};

export const Default: Story = {
  render: () => {
    const [products, setProducts] = useState<ProductPreview[]>(createInitialProducts);
    const { t } = useTranslation('translation', { keyPrefix: 'pages.cart' });

    const handleRemoveProduct = (productId: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const generateRandomProducts = (count: number): void => {
      for (let i = 1; i <= count; i++) {
        setProducts((prev) => [...prev, createRandomProduct(new Date().toString())]);
      }
    };

    return (
      <>
        <ProductList products={products} onRemove={handleRemoveProduct} />
        <Button onClick={() => generateRandomProducts(3)}>{t('showMore')}</Button>
      </>
    );
  },
};
