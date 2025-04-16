import { fn } from '@storybook/test';
import { default as Modal } from '@shared/ui/modal';

export default {
  title: 'Example/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onClose: fn(),
    title: 'title',
    children: 'children',
  },
};

export const Open = {
  args: {
    open: true,
  },
};
