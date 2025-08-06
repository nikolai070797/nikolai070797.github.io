import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import NavLink from '@shared/ui/NavLink';
import { MouseEvent } from 'react';
import { CartIcon } from '@shared/ui/cart';
import { AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem } from '@mui/material';
import { useAuthStore } from '@features/auth';
import { useProfileStore } from '@features/profile/model/profileStore';

const MobileMenu = () => {
  const { t } = useTranslation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { token, logout } = useAuthStore();
  const { clearProfile } = useProfileStore();

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogOut = async () => {
    logout();
    clearProfile();
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
        <NavLink to="/modal">{t('pages.modal.title')}</NavLink>
        <NavLink to="/cart" icon={<CartIcon />}>
          {t('pages.cart.title')}
        </NavLink>

        {token ? (
          <Box>
            <NavLink to="/profile" icon={<AccountCircle />}>
              {t('pages.profile.title')}
            </NavLink>
            <MenuItem onClick={handleLogOut}>{t('nav.logout')}</MenuItem>
          </Box>
        ) : (
          <NavLink to="/login">{t('nav.login')}</NavLink>
        )}
      </Menu>
    </>
  );
};

export default MobileMenu;
