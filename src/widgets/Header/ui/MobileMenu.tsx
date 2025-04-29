import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import NavLink from '@shared/ui/NavLink';
import { MouseEvent } from 'react';
import { CartIcon } from '@shared/ui/cart';
import { AccountCircle } from '@mui/icons-material';

const MobileMenu = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <>
      <IconButton size="large" aria-label="show more" color="inherit" onClick={handleMobileMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
      >
        <NavLink to="/modal">Модальное окно</NavLink>
        <NavLink to="/cart" icon={<CartIcon />}>
          Корзина
        </NavLink>
        <NavLink to="/" icon={<AccountCircle />}>
          Профиль
        </NavLink>
      </Menu>
    </>
  );
};

export default MobileMenu;
