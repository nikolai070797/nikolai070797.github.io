import { useTranslation } from 'react-i18next';
import CategoryPage from './ui/Category';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.category' });
  return [{ title: t("title") }];
};

export default CategoryPage;
