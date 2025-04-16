import type { Preview } from "@storybook/react";
import { Router } from "react-router";
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // reactRouter: reactRouterParameters({}),
    reactRouter: Router,
  },
};

export default preview;
