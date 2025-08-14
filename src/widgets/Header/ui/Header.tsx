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
import { useTranslation } from 'react-i18next';
import ToggleLocalization from '@shared/ui/ToggleLocalization/ToggleLocalization';
import { useAuthStore } from '@features/auth/model/authStore';


const Header = () => {
  const { t } = useTranslation();
  const { token } = useAuthStore();

  return (
    <Box className={s.headerContainer}>
      <AppBar className={s.appBar}>
        <Toolbar className={s.toolbar}>
          <NavLink to="/" icon={<Logo />} className={s.logoContainer}>
            <Typography variant="h6" className={s.title}>
              {t("app.title")}
            </Typography>
          </NavLink>

          <Box className={s.navContainer}>
            {/* <NavLink to="/modal">{t("pages.modal.title")}</NavLink> */}
            {/* <NavLink to="/cart">{t("pages.cart.title")}</NavLink> */}
            <NavLink to="/product">{t("pages.product.title")}</NavLink>
            <NavLink to="/category">{t("pages.category.title")}</NavLink>
            {/* <NavLink to="/examples">{t("pages.examples.title")}</NavLink> */}
          </Box>

          <Box className={s.actionsContainer}>
            <ToggleTheme />
            <ToggleLocalization/>
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
