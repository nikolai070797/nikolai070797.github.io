import { Layout } from '@shared/ui';
import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';

export default function App() {
  return (
    //<StyledEngineProvider injectFirst>
    <React.StrictMode>
      <StyledEngineProvider> 
        <Layout />
      </StyledEngineProvider>
    </React.StrictMode>
  );
}
