import { fn } from '@storybook/test';
import { default as Modal } from '@shared/ui/modal';
import type { Meta, StoryObj } from '@storybook/react';

const modal: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onClose: fn(),
    title: 'title',
    children: 'children',
  },
};

export default modal;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    open: true,
  },
};
