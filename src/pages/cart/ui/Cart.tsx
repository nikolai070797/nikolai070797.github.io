import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductList } from '@features/ProductList';
import { fetchProducts } from '@shared/api/products';
import { ProductPreview } from '@entities/product';
import { Button, Stack, CircularProgress } from '@mui/material';

const CartPage = () => {
  const { t } = useTranslation('translation');
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Начальная загрузка
  useEffect(() => {
    const loadInitialProducts = async () => {
      const initialProducts = await fetchProducts(1);
      setProducts(initialProducts);
      setPage(2);
    };
    loadInitialProducts();
  }, []);

  // Асинхронная подгрузка новых товаров
  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const newProducts = await fetchProducts(page);
      if (newProducts.length === 0) {
        setHasMore(false); // Больше нет товаров
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`${t("errors.LoadingProducts")}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (<>
    <Button onClick={loadMoreProducts}>{t('pages.cart.showMore')}</Button>
    <Stack spacing={2}>
      <ProductList products={products} onRemove={handleRemoveProduct} onLoadMore={loadMoreProducts} />

      {/* Кнопка или индикатор загрузки */}
      {isLoading && <CircularProgress />}
      {!hasMore && <div>{t('components.product.noMoreProducts')}</div>}
    </Stack></>
  );
};

export default CartPage;
