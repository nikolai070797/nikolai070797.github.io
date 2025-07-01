import { useTranslation } from 'react-i18next';
import ExamplePage from './ui/Example';

export const meta = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.examples' });
  return [{ title: t("title") }];
};

export default ExamplePage;
