import type { Preview } from "@storybook/react";
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

const preview: Preview = {
  decorators: [withRouter], // <--- Добавьте декоратор
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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