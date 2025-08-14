import { Avatar, Box, Chip, List, ListItem, Typography } from '@mui/material';
import { Product } from '@entities/product';
import { CartButtonAdd } from '@shared/ui/cart';
import Price from '@shared/ui/price';
import { memo } from 'react';

export type PreviewFullProps = {
  product: Product;
};

export const PreviewFull = memo(({ product }: PreviewFullProps) => {
  return (
    <Box id={product.id}>
      <List>
        <ListItem>
          <Typography variant="h6">{product.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography>{product.photo && <img width={'100%'} height={'100%'} src={product.photo} />}</Typography>
        </ListItem>
        <ListItem>
          <Typography>{product.desc}</Typography>
        </ListItem>
        <ListItem>
          <Typography>
            {new Date(product.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </ListItem>
        <ListItem>
          <Box width={1} sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
            <Price price={product.price} oldPrice={product.oldPrice} />
            <CartButtonAdd product={product} />
          </Box>
        </ListItem>
      </List>
      {product.category && (
        <ListItem>
          <Chip
            id={product.category.id}
            avatar={<Avatar alt={product.category.name} src={product.category.photo} />}
            label={product.category.name}
          />
        </ListItem>
      )}
      <ListItem>
        <Typography variant="body2" color="textSecondary">
          Создано:{' '}
          {new Date(product.createdAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body2" color="textSecondary">
          Обновлено:{' '}
          {new Date(product.updatedAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body2" color="textSecondary">
          commandId: {product.commandId}
        </Typography>
      </ListItem>
    </Box>
  );
});
