import { Product, ProductPreview } from '@entities/product';
import { ProductList } from '@features/ProductList';
import { Card, Grid } from '@mui/material';
import { fetchProducts } from '@shared/api/products';
import { PreviewFull, PreviewMini } from '@shared/ui/product';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      const initialProducts = await fetchProducts(1, 1);
      setProducts(initialProducts);
    };
    loadInitialProducts();
  }, []);

  return (
    <Grid container spacing={2}>
      <Card sx={{ height: 'fit-content' }}>
        <ProductList products={products} renderItem={(product) => <PreviewFull product={product} />} />
      </Card>
      <Card sx={{ height: 'fit-content' }}>
        <ProductList products={products} renderItem={(product) => <PreviewMini product={product} />} />
      </Card>
    </Grid>
  );
};

export default ProductPage;
