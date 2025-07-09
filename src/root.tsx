import React from 'react';
import Layout from '@widgets/Layout';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { ThemeProvider as AppThemeProvider, MuiThemeProviderWrapper, useAppTheme } from '@app/styles/ThemeContext';
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
