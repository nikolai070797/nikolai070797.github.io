import { Avatar, Box, Chip, List, ListItem, Typography } from '@mui/material';
import { Product } from '@entities/product';
import { CartButtonAdd } from '@shared/ui/cart';
import Price from '@shared/ui/price';

export type PreviewFullProps = {
  product: Product;
};

function PreviewFull({ product }: PreviewFullProps) {
  return (
    <Box id={product.id}>
      <List>
        <ListItem>
          <Typography variant="h6">{product.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography>{product.photo && <img src={product.photo} />}</Typography>
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
            <CartButtonAdd product={product}/>
          </Box>
        </ListItem>
      </List>
      <Box>
        <ListItem>
          <Chip
            id={product.category.id}
            avatar={<Avatar alt={product.category.name} src={product.category.photo} />}
            label={product.category.name}
          />
        </ListItem>
      </Box>
    </Box>
  );
}

export default PreviewFull;
