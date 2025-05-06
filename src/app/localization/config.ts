import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export enum Languages {
  ru = 'ru',
  en = 'en',
}

export const LANG_STORAGE_KEY = 'lang';
export const DEFAULT_LANG = Languages.ru;

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string) => import(`@locales/${language}.json`)))
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: DEFAULT_LANG,
    saveMissing: true,
    backend: {
      loadPath: '/locales/{{lng}}.json',
      //   loadPath: (langs: string[], ns: string) =>
      //     process.env.NODE_ENV === 'production' ? `/locales/${langs[0]}.json` : `@locales/${langs[0]}.json`,
    },
    detection: {
      convertDetectedLanguage: (lng) => lng.split('-')[0],
    },
  });

export default i18n;
