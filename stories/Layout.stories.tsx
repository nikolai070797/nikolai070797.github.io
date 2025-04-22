import Home from '@pages/home';
import { default as Layout } from '@shared/ui/layout';
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter, reactRouterParameters, reactRouterOutlet } from 'storybook-addon-remix-react-router';

const layout: Meta<typeof Layout> = {
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',  
    parameters: {
      reactRouter: reactRouterParameters({
        routing: reactRouterOutlet(<Home/>),
      }),
    },
  },

};

export default layout;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {

};


