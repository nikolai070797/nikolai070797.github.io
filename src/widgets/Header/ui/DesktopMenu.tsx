import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import NavLink from '@shared/ui/NavLink';
import { ProfileControl } from '@features/auth/ui/ProfileControl';
import { useAuthStore } from '@features/auth';
import { useProfileStore } from '@features/profile/model/profileStore';

const DesktopMenu = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { logout } = useAuthStore();
  const { clearProfile } = useProfileStore();

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    logout();
    clearProfile();
    handleMenuClose();
  };

  return (
    <>
      <MenuItem>
        <ProfileControl onProfileClick={handleProfileMenuOpen} />
      </MenuItem>
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} keepMounted>
        <NavLink onClick={handleMenuClose} to="/profile">
          {t('pages.profile.title')}
        </NavLink>
        <MenuItem onClick={handleLogOut}>{t('nav.logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default DesktopMenu;
