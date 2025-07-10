import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import NavLink from '@shared/ui/NavLink';

const DesktopMenu = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <>
      <IconButton size="large" edge="end" color="inherit" aria-label="account" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        keepMounted
      >
        <NavLink onClick={handleMenuClose} to="/profile">{t("pages.profile.title")}</NavLink>
        {/* <MenuItem onClick={handleMenuClose}  >{t("pages.profile.title")}</MenuItem> */}
        <MenuItem onClick={handleMenuClose}>{t("nav.logout")}</MenuItem>
      </Menu>
    </>
  );
};

export default DesktopMenu;
