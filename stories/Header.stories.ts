import type { Meta, StoryObj } from '@storybook/react';
import { default as Header } from '@shared/ui/header';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Desctop: Story = {
  args: {},
};

export const Ipad: Story = {
  args: {},
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad',
    },
  },
};
