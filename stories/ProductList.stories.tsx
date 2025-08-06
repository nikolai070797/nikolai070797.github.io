import { useState } from 'react';
import { Product } from '@entities/product';
import { ProductList } from '@features/ProductList';
import { createRandomProduct } from '@homeworks/ts1/3_write';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CartItem } from '@shared/ui/cart';

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
  const products: Product[] = [];
  for (let i = 1; i <= 3; i++) {
    products.push(createRandomProduct(new Date().toString()));
  }
  return products;
};

export const Default: Story = {
  render: () => {
    const [products, setProducts] = useState<Product[]>(createInitialProducts);
    const { t } = useTranslation('translation', { keyPrefix: 'pages.cart' });

    const generateRandomProducts = (count: number): void => {
      for (let i = 1; i <= count; i++) {
        setProducts((prev) => [...prev, createRandomProduct(new Date().toString())]);
      }
    };
    
    const handleRemoveProduct = (productId: string) => () => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    return (
      <>
        <ProductList
          products={products}
          renderItem={(product) => <CartItem product={product} onRemove={handleRemoveProduct(product.id)} />}
        />
        <Button onClick={() => generateRandomProducts(3)}>{t('showMore')}</Button>
      </>
    );
  },
};
