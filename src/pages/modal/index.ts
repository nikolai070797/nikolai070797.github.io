import { useTranslation } from 'react-i18next';
import ModalPage from './ui/modal';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.modal' });
  return [{ title: t("title") }];
};

export default ModalPage;
