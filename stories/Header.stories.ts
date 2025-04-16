import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { default as Header } from '@shared/ui/header';


const meta: Meta<typeof Header> = {
  component: Header,
};
 
export default meta;
type Story = StoryObj<typeof Header>;
 
export const Main: Story = {
  args: {
    // primary: true,
    // label: 'Header',
  },
};