import React, { useEffect, useRef } from 'react';
import { ProductPreview } from '@entities/product';
import { Card } from '@mui/material';
import { CartItem } from '@shared/ui/cart';

export type ProductListProps = {
  products: ProductPreview[];
  onRemove?: (id: string) => void;
  onLoadMore?: () => void;
};

const ProductList = ({ products, onRemove, onLoadMore }: ProductListProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(entries[0]);
          onLoadMore();
        }
      },
      { rootMargin: '0px 0px 200px 0px' } // Срабатывает за 200px до конца
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [onLoadMore]);

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} sx={{ height: 'fit-content' }}>
          <CartItem onRemove={() => onRemove?.(product.id)} product={product} />
        </Card>
      ))}
      {/* Sentinel для отслеживания прокрутки */}
      <div ref={sentinelRef} style={{ height: '20px' }} />
    </>
  );
};

export default ProductList;
