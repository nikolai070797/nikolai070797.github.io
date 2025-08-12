import React, { useEffect, useRef } from 'react';
import { Card, Grid } from '@mui/material';

// Универсальный тип для элементов списка
export type ListItemType = {
  id: string | number;
};

export type ListProps<T extends ListItemType> = {
  items: T[];
  onLoadMore?: () => void;
  renderItem: (item: T) => React.ReactNode;
  itemGridProps?: React.ComponentProps<typeof Grid>; // Позволяет кастомизировать Grid item
};

export const List = <T extends ListItemType>({
  items,
  onLoadMore,
  renderItem,
  itemGridProps = { sx: { xs: 12 } },
}: ListProps<T>) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '0px 0px 200px 0px' }
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
      {items?.map((item) => (
        <Grid key={item.id} {...itemGridProps}>
          <Card>{renderItem(item)}</Card>
        </Grid>
      ))}
      {/* Sentinel для отслеживания прокрутки */}
      {onLoadMore && <div ref={sentinelRef} style={{ height: '20px' }} />}
    </>
  );
};
