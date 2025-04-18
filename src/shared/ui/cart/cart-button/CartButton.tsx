import { IconButton, Link } from '@mui/material';

import { Link as RouterLink } from 'react-router';
import CartIcon from '../cart-icon/CartIcon';

export type CartButtonProps = {
  // children?: ReactNode;
};

const CartButton = ({}: CartButtonProps) => {
  return (
    <Link component={RouterLink} to="cart" underline="none" color="inherit">
      <IconButton size="large" color="inherit">
        <CartIcon />
      </IconButton>
    </Link>
  );
};

export default CartButton;
