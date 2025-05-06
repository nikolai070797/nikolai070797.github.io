import { useTranslation } from 'react-i18next';
import ProductPage from './ui/Product';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.product' });
  return [{ title: t("title") }];
};

export default ProductPage;
