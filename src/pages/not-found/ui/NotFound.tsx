import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const NotFound = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.404' });
  return (
    <>
      <h1>404 - {t("text")}</h1>
      <Link to="/">{t("urlBack")}</Link>
    </>
  );
};

export default NotFound;
