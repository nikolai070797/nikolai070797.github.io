import React from 'react';
import { ProductPreview } from '@entities/product';
import { Box, Card, Stack } from '@mui/material';
import { CartItem } from '@shared/ui/cart';

export type ProductListProps = {
  products: ProductPreview[];

  onRemove?: (productId: string) => void;
};

const ProductList = ({ products, onRemove }: ProductListProps) => {
  return (
    <Stack gap={1}>
      {products.map((product) => (
        <Card key={product.id}>
          <CartItem onRemove={() => onRemove?.(product.id)} product={product} />
        </Card>
      ))}
    </Stack>
  );
};

export default ProductList;
