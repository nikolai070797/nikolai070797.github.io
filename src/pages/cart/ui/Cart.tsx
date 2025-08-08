import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductList } from '@features/ProductList';
import { fetchProducts, fetchProductsById } from '@shared/api/products';
import { Product } from '@entities/product';
import { Button, Stack, CircularProgress, Typography } from '@mui/material';
import { CartItem } from '@shared/ui/cart';
import { useCartStore } from '@shared/store';
import { productApi } from '@entities/product/api/productApi';

const CartPage = () => {
  const { cartItems, removeProduct, clear } = useCartStore();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  // Загружаем полную информацию о продуктах при изменении cartItems
  useEffect(() => {
    const loadProducts = async () => {
      const productIds = cartItems.map((item) => item.productId);
      const productsResult = await productApi.getProducts({ ids: productIds });
      if (productsResult) setProducts(productsResult.data);
    };

    loadProducts();
  }, [cartItems]);

  const getHandleRemove = useCallback(
    (id: string) => () => {
      removeProduct(id);
    },
    [removeProduct]
  );

  return (
    <>
      <Typography variant="h4">{t('pages.cart.title')}</Typography>
      {cartItems.length === 0 ? (
        <Typography>{t('pages.cart.empty')}</Typography>
      ) : (
        <>
          <Button onClick={clear}>{t('pages.cart.clear')}</Button>
            <ProductList
              products={products}
              renderItem={(product) => <CartItem product={product} onRemove={getHandleRemove(product.id)} />}
            />
        </>
      )}
    </>
  );
};

export default CartPage;
