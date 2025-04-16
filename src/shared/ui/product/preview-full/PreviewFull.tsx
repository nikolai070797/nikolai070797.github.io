import { Box, List, ListItem, Typography } from '@mui/material';
import { Product } from '@entities/product';
import { CartButtonAdd } from '@shared/ui/cart';
import Price from '@shared/ui/price';

export type PreviewFullProps = {
  product: Product;
};

function PreviewFull({ product }: PreviewFullProps) {
  return (
    <Box>
      <Typography variant="h5">PreviewFull</Typography>
      <List>
        <ListItem>
          <Typography variant="h6">{product.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography>id: {product.id}</Typography>
        </ListItem>
        <ListItem>
          <Typography>{product.photo && <img src={product.photo} />}</Typography>
        </ListItem>
        <ListItem>
          <Typography>desc: {product.desc}</Typography>
        </ListItem>
        <ListItem>
          <Typography>createdAt: {product.createdAt}</Typography>
        </ListItem>
        <ListItem>
          <Box width={1} sx={{ display: 'inline-flex', justifyContent: 'space-between' }}>
            <Price price={product.price} oldPrice={product.oldPrice} />
            <CartButtonAdd />
          </Box>
        </ListItem>
      </List>
      <Box>
        <ListItem>
          <Typography variant="h6">Категория</Typography>
        </ListItem>
        <ListItem>
          <Typography>id: {product.category.id}</Typography>
        </ListItem>
        <ListItem>
          <Typography>name: {product.category.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography>{product.category.photo && <img src={product.category.photo} />}</Typography>
        </ListItem>
      </Box>
    </Box>
  );
}

export default PreviewFull;
