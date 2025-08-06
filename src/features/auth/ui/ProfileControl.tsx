import { Typography, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import { memo, MouseEvent } from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { useProfileStore } from '@features/profile/model/profileStore';
import { useAuthStore } from '../model/authStore';

export type ProfileControlProps = {
  onProfileClick?: (event: MouseEvent<HTMLElement>) => void;
};

const ProfileControlRaw = ({ onProfileClick }: ProfileControlProps) => {
  const { token } = useAuthStore();
  const { profile } = useProfileStore();
  const { t } = useTranslation();

  if (!token) {
    return (
      <Link component={RouterLink} to="/login" underline="none" color="inherit">
        {t('pages.login.title')}
      </Link>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      onClick={(e) => {
        e.stopPropagation();
        onProfileClick?.(e);
      }}
    >
      <AccountCircle />
      <Typography>{profile ? (profile.name ?? profile.email) : token.substring(0, 5) + '...'}</Typography>
    </Box>
  );
};

ProfileControlRaw.defaultProps = {
  onProfileClick: undefined,
};

export const ProfileControl = memo(ProfileControlRaw);
