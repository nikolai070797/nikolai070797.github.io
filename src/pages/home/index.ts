import { useTranslation } from 'react-i18next';
import Home from './ui/Home';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });
  return [{ title: t("title")}];
};

export default Home;
