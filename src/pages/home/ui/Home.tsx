// import s from './Home.module.scss';

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });
  return <h1>{t("title")}</h1>;
};

export default Home;
