import { createTheme } from '@mui/material';
import { ruRU, enUS } from '@mui/material/locale';

export const muiLocales = {
  en: enUS,
  ru: ruRU,
};

export const defaultLocale = 'ru';

export const getInitialLocale = () => {
  // Проверяем, что код выполняется в браузере
  if (typeof window === 'undefined') {
    return muiLocales.ru; 
  }

  const lang = localStorage.getItem('i18nextLng') || defaultLocale;
  return muiLocales[lang as keyof typeof muiLocales] || muiLocales.ru;
};

// Создаем начальную тему
let currentTheme = createTheme(
  {
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
  },
  getInitialLocale()
);

// Функция для обновления темы
export const setThemeLocale = (locale: keyof typeof muiLocales) => {
  currentTheme = createTheme(
    {
      colorSchemes: { light: true, dark: true },
      cssVariables: {
        colorSchemeSelector: 'class',
      },
    },
    muiLocales[locale]
  );
};

// Функция для получения текущей темы
export const getTheme = () => currentTheme;
