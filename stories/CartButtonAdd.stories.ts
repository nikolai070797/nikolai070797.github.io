import { CartButtonAdd } from '@shared/ui/cart';
import type { Meta, StoryObj } from '@storybook/react';

const cartButtonAdd: Meta<typeof CartButtonAdd> = {
  component: CartButtonAdd,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default cartButtonAdd;
type Story = StoryObj<typeof CartButtonAdd>;

export const Empty: Story = {
  args: {
    count: 0,
  },
};

export const WithCount: Story = {
  args: {
    count: 1,
  },
};
