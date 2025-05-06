import Layout from '@widgets/Layout';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@app/styles';
import { LocalizationInitiator } from '@app/localization/LocalizationInitiator';

export default function App() {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationInitiator/>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}
