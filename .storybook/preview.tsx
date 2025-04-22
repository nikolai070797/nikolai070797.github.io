import type { Preview } from '@storybook/react';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/app/styles';

import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';



const preview: Preview = {
  decorators: [
    withRouter,
    withThemeFromJSXProvider({
      themes: {
        theme
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
    (Story) => (
      <StyledEngineProvider injectFirst>
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
    reactRouter: reactRouterParameters({
      // initialEntries: ['/'],
      // router: {
      //   basename: "/", // Базовый путь приложения
      // },
      // hydration: true,
    }),
  },
};

export default preview;
