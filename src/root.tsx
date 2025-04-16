import Layout from '@shared/ui/layout/Layout';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@app/styles';

export default function App() {
  return (
    <React.StrictMode>
      {/* <StyledEngineProvider injectFirst> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      {/* </StyledEngineProvider> */}
    </React.StrictMode>
  );
}
