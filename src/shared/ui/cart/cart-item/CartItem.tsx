import { ProductPreview } from '@entities/product';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './CartItem.module.scss';
import Price from '@shared/ui/price';
import CartButtonAdd from '../cart-button-add/CartButtonAdd';

export type CartItemProps = {
  product: ProductPreview;
  onRemove: () => void;
};

const CartItem = ({ product, onRemove }: CartItemProps) => {
  return (
    <Box gap={2} className={s['cart-item']}>
      <img width={128} height={128} src={product.photo} />
      <Box width={1} pr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{product.name}</Typography>
          <CartButtonAdd count={1} />
        </Box>
        <Box>
          <Box className={s.buttons}>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={onRemove} />
            </IconButton>
          </Box>
          <Price price={product.price} oldPrice={product.oldPrice} />
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
