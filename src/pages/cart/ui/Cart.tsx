import { createRandomProduct } from '@homeworks/ts1/3_write';
import { ProductPreview } from '@entities/product';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductList } from '@features/ProductList';

let arrayProducts: ProductPreview[] = [];
for (let i = 1; i <= 3; i++) {
  arrayProducts.push(createRandomProduct(new Date().toString()));
}

const CartPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.cart' });
  const [products, setProducts] = useState<ProductPreview[]>(arrayProducts);

  const generateRandomProducts = (count: number): void => {
    for (let i = 1; i <= count; i++) {
      setProducts((prev) => [...prev, createRandomProduct(new Date().toString())]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <>
      <ProductList products={products} onRemove={handleRemoveProduct} />
      <Button onClick={() => generateRandomProducts(3)}>{t('showMore')}</Button>
    </>
  );
};

export default CartPage;
