import { useTranslation } from "react-i18next";

const Footer = () => {
  const { i18n, t } = useTranslation('translation', { keyPrefix: 'components.CartButtonAdd' });
  return (
    <>
      <h1>Footer {i18n.language.toUpperCase()}</h1>
    </>
  );
};

export default Footer;
