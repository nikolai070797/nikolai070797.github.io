import React from 'react';
import Layout from '@widgets/Layout';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider as AppThemeProvider, MuiThemeProviderWrapper, useAppTheme } from '@app/styles/ThemeContext';
import { LocalizationInitiator } from '@app/localization/LocalizationInitiator';

import { AxiosInterceptor } from '@app/axiosConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <AppThemeProvider>
            <MuiThemeProviderWrapper>
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <LocalizationInitiator />
                <CssBaseline />
                <AxiosInterceptor>
                  <Layout />
                </AxiosInterceptor>
              </SnackbarProvider>
            </MuiThemeProviderWrapper>
          </AppThemeProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
