import { useTranslation } from 'react-i18next';
import LoginPage from './ui/Login';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.login' });
  return [{ title: t("title") }];
};

export default LoginPage;
