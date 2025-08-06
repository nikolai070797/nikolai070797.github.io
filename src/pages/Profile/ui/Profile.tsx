import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProfileForm } from '../../../features/profile/ui/ProfileForm';

const ProfilePage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.profile' });
  return (
    <>
      <Typography>{t("title")}</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography>{t("updateProfile.title")}</Typography>
      </Box>
      <ProfileForm />
    </>
  );
};

export default ProfilePage;
