import React from 'react';
import Layout from '@widgets/Layout';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as AppThemeProvider, useAppTheme } from '@app/styles/ThemeContext';
import { LocalizationInitiator } from '@app/localization/LocalizationInitiator';

export default function App() {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <AppThemeProvider>
          <MuiThemeProviderWrapper>
            <LocalizationInitiator />
            <CssBaseline />
            <Layout />
          </MuiThemeProviderWrapper>
        </AppThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

// Отдельный компонент для MUI ThemeProvider
function MuiThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
