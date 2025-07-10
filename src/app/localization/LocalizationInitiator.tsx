import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LocalizationInitiator: FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.body.parentElement;
    if (html) {
      html.lang = i18n.language;
    }
  }, [i18n.language]);

  return null;
};
