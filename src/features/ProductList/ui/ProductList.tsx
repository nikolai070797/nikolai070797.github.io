import React, { useEffect, useRef } from 'react';
import { Product } from '@entities/product';
import { Card } from '@mui/material';

export type ProductListProps = {
  products: Product[];
  onLoadMore?: () => void;
  renderItem: (product: Product) => React.ReactNode;
};

const ProductList = ({ products, onLoadMore, renderItem }: ProductListProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
          {renderItem(product)}
        </Card>
      ))}
      {/* Sentinel для отслеживания прокрутки */} 
      <div ref={sentinelRef} style={{ height: '20px' }} />
    </>
  );
};

export default ProductList;
