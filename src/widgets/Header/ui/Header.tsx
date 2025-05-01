import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Logo from '@shared/ui/logo';
import ToggleTheme from '@shared/ui/ToggleTheme';
import { CartButton } from '@shared/ui/cart';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import NavLink from '@shared/ui/NavLink';
import s from './Header.module.scss';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Box className={s.headerContainer}>
      <AppBar className={s.appBar}>
        <Toolbar className={s.toolbar}>
          <NavLink to="/" icon={<Logo />} className={s.logoContainer}>
            <Typography variant="h6" className={s.title}>
              Николай Тартышный
            </Typography>
          </NavLink>

          <Box className={s.navContainer}>
            <NavLink to="/modal">Модальное окно</NavLink>
            <NavLink to="/cart">Корзина</NavLink>
            <NavLink to="/product">Продукт</NavLink>
          </Box>

          <Box className={s.actionsContainer}>
            <ToggleTheme />
            <CartButton />
            <DesktopMenu />
          </Box>

          <Box className={s.mobileMenuButton}>
            <MobileMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
