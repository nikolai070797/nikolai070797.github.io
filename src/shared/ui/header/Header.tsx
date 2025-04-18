import Logo from '@shared/ui/logo';
import { useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { CartIcon, CartButton } from '../cart';
import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import s from './Header.module.scss';
import ToggleTheme from '../toggle-theme';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
      <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link component={RouterLink} to="/modal" underline="none" color="inherit">
        <MenuItem>
          <Typography sx={{ textAlign: 'center' }}>Модальное окно</Typography>
        </MenuItem>
      </Link>
      <Link component={RouterLink} to="/cart" underline="none" color="inherit">
        <MenuItem>
          <CartIcon>
            <Typography sx={{ textAlign: 'center' }}>Корзина</Typography>
          </CartIcon>
        </MenuItem>
      </Link>
      <Link component={RouterLink} to="/" underline="none" color="inherit">
        <MenuItem onClick={handleProfileMenuOpen}>
          <AccountCircle />
          <Typography sx={{ pl: 1, textAlign: 'center' }}>Профиль</Typography>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <Box className={s.header} sx={{ flexGrow: 1 }}>
      <AppBar className={s.header} position="fixed">
        <Toolbar className={s.header}>
          <Link component={RouterLink} to="/" underline="none" color="inherit">
            <MenuItem>
              <Logo />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}>
                Николай Тартышный
              </Typography>
            </MenuItem>
          </Link>

          <Link component={RouterLink} to="/modal" underline="none" color="inherit">
            <MenuItem>
              <Typography sx={{ textAlign: 'center' }}>Модальное окно</Typography>
            </MenuItem>
          </Link>

          <Link component={RouterLink} to="/cart" underline="none" color="inherit">
            <MenuItem>
              <Typography sx={{ textAlign: 'center' }}>Корзина</Typography>
            </MenuItem>
          </Link>

          <Link component={RouterLink} to="/product" underline="none" color="inherit">
            <MenuItem>
              <Typography sx={{ textAlign: 'center' }}>Продукт</Typography>
            </MenuItem>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ToggleTheme />
            <CartButton />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
