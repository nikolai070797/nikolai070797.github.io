import { useTranslation } from 'react-i18next';
import ProfilePage from './ui/Profile';


export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.profile' });
  return [{ title: t("title") }];
};


export default  ProfilePage;