import React, { useState, useEffect, useContext } from 'react';
import { getTheme, muiLocales, setThemeLocale } from './theme';
import { useTranslation } from 'react-i18next';

type ThemeContextType = {
  theme: any;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const locale = lng as keyof typeof muiLocales;
      setThemeLocale(locale);
      setTheme(getTheme());
    };

    // Обновляем тему при инициализации
    handleLanguageChange(i18n.language);

    // Подписываемся на событие смены языка
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};