import { useTranslation } from 'react-i18next';
import NotFound from './ui/NotFound';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.404' });
  return [{ title: t("title") }];
};

export default NotFound;