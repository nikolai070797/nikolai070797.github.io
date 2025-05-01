import Logo from '@shared/ui/logo';
import type { Meta, StoryObj } from '@storybook/react';

const logo: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default logo;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
