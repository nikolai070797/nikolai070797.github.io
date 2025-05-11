import type { Preview } from '@storybook/react';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/app/styles';
import { LocalizationInitiator } from '../src/app/localization/LocalizationInitiator';

import { StyledEngineProvider, useTheme } from '@mui/material/styles';
import React from 'react';


import { createTheme } from '@mui/material';


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});



const preview: Preview = {
  decorators: [
    withRouter,
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    (Story) => (
      <StyledEngineProvider injectFirst>
        <LocalizationInitiator/>
        {Story()}
      </StyledEngineProvider>
    ),
  ],

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },
};

export default preview;

