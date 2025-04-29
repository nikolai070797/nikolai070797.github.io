import Home from '@pages/home';
import { default as Layout } from '@widgets/Layout';
import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters, reactRouterOutlet } from 'storybook-addon-remix-react-router';

const layout: Meta<typeof Layout> = {
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    parameters: {
      reactRouter: reactRouterParameters({
        routing: reactRouterOutlet(<Home />),
      }),
    },
  },
};

export default layout;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
