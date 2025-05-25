import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductList } from '@features/ProductList';
import { fetchProducts } from '@shared/api/products';
import { Product } from '@entities/product';
import { Button, Stack, CircularProgress, Typography } from '@mui/material';
import { CartItem } from '@shared/ui/cart';
import { useCartStore } from '@shared/store';

const CartPage = () => {
  const { cartItems, removeProduct, clear } = useCartStore();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4">{t('pages.cart.title')}</Typography>
      {cartItems.length === 0 ? (
        <Typography>{t('pages.cart.empty')}</Typography>
      ) : (
        <>
          <Button onClick={clear}>{t('pages.cart.clear')}</Button>
          <Stack spacing={2}>
            <ProductList
              products={cartItems.map(item => item.product)}
              renderItem={(product) => <CartItem product={product} onRemove={() => removeProduct(product.id)} />}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default CartPage;

