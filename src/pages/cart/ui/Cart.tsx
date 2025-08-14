import React, { useMemo, useCallback } from 'react';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuery, QueryFunctionContext, keepPreviousData } from '@tanstack/react-query';
import { productApi } from '@entities/product/api/productApi';
import { Product, ProductFilters, ProductsResult } from '@entities/product';
import { CartItem } from '@shared/ui/cart';
import { useCartStore } from '@shared/store';
import Price from '@shared/ui/price';
import { List } from '@shared/ui/list';

const CartPage: React.FC = () => {
  const { cartItems, removeProduct, clear } = useCartStore();
  const { t } = useTranslation();

  // IDs текущих товаров в корзине
  const ids = useMemo<string[]>(() => cartItems.map((item) => item.productId), [cartItems]);

  // Запрос на получение товаров по ID
  const {
    data: productsResult,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<ProductsResult, Error, ProductsResult, ['products', ProductFilters]>({
    queryKey: ['products', { ids }],
    queryFn: ({ signal }: QueryFunctionContext<['products', ProductFilters]>) => productApi.list({ ids }, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  const products: Product[] = productsResult?.data ?? [];

  // Расчёт общей суммы
  const total = useMemo<number>(() => {
    return cartItems.reduce<number>((sum, cartItem) => {
      const prod = products.find((p) => p.id === cartItem.productId);
      return sum + (prod?.price ?? 0) * cartItem.quantity;
    }, 0);
  }, [cartItems, products]);

  const handleRemove = useCallback((id: string) => removeProduct(id), [removeProduct]);

  if (cartItems.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          {t('pages.cart.title')}
        </Typography>
        <Typography>{t('pages.cart.empty')}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" mb={2} alignItems="center">
        <Typography variant="h4">{t('pages.cart.title')}</Typography>
        <Button variant="outlined" onClick={clear} disabled={isFetching}>
          {t('pages.cart.clear')}
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error">{error.message}</Typography>
      ) : (
        <>
          <Stack spacing={2}>
            <List
              items={products}
              renderItem={(product) => <CartItem product={product} onRemove={() => handleRemove(product.id)} />}
            />
          </Stack>

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Typography variant="h6">
              {t('pages.cart.total')}: <Price price={total} />
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
