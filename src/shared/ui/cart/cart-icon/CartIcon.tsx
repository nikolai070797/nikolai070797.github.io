import { Badge, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartCount } from '@shared/store/CartStore';

export type CartIconProps = {
  children?: ReactNode;
};

const CartIcon = ({ children }: CartIconProps) => {
  const count = useCartCount();

  return (
    <>
      <Badge badgeContent={count} color="error">
        <ShoppingCartIcon />
      </Badge>
      {children && (
        <Typography component="span" sx={{ pl: 1, textAlign: 'center' }}>
          {children}
        </Typography>
      )}
    </>
  );
};

export default CartIcon;
