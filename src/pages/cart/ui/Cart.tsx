import { createRandomProduct } from '@homeworks/ts1/3_write';
import { ProductPreview } from '@entities/product';
import { Box, Button, Card, Stack } from '@mui/material';
import { CartButtonAdd } from '@shared/ui/cart';
import CartItem from '@shared/ui/cart/cart-item/CartItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  
  const handlerRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CartButtonAdd count={0} />
      </Box>
      <hr/>
      <Stack gap={1}>
        {products.map((product) => (
          <Card key={product.id} >
            <CartItem onRemove={() => {handlerRemoveProduct(product.id)}} product={product} />
          </Card>
        ))}
      </Stack>
      <Button onClick={() => generateRandomProducts(3)}>{t("showMore")}</Button>
    </>
  );
};

export default CartPage;
