import { useTranslation } from 'react-i18next';
import CartPage from './ui/Cart';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.cart' });
  return [{ title: t("title") }];
};

export default CartPage;
