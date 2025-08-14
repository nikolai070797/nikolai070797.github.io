import { createRandomProduct } from '@homeworks/ts1/3_write';
import { PreviewMini } from '@entities/product';
import type { Meta, StoryObj } from '@storybook/react';

const myProduct = createRandomProduct(new Date().toString());

const previewMini: Meta<typeof PreviewMini> = {
  component: PreviewMini,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default previewMini;

type Story = StoryObj<typeof PreviewMini>;

export const Default: Story = {
  args: {
    product: {
      id: myProduct.id,
      name: myProduct.name,
      price: myProduct.price,
      oldPrice: myProduct.oldPrice,
      photo: myProduct.photo,
      desc: myProduct.desc,
    },
  },
};
