import { createRandomProduct } from '@homeworks/ts1/3_write';
import { PreviewFull } from '@entities/product';
import type { Meta, StoryObj } from '@storybook/react';

const myProduct = createRandomProduct(new Date().toString());

const previewFull: Meta<typeof PreviewFull> = {
  component: PreviewFull,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default previewFull;

type Story = StoryObj<typeof PreviewFull>;

export const Default: Story = {
  args: {
    product: myProduct,
  },
};
