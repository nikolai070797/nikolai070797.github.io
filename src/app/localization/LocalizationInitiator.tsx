import { FC, useInsertionEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './config';

export const LocalizationInitiator: FC = () => {
  const { i18n } = useTranslation();

  useInsertionEffect(() => {
    const html = document.body.parentElement;
    if (html) {
      html.lang = i18n.language;
    }
  }, [i18n.language]);

  return null;
};
