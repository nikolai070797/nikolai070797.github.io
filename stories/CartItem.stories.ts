import { CartItem } from '@shared/ui/cart';
import type { Meta, StoryObj } from '@storybook/react';
import { createRandomProduct } from '@/homeworks/ts1/3_write';
import { fn } from '@storybook/test';

const myProduct = createRandomProduct(new Date().toString());

const cartItem: Meta<typeof CartItem> = {
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default cartItem;

type Story = StoryObj<typeof CartItem>;

export const Default: Story = {
  args: {
    onRemove: fn(),
    product: {
        id: myProduct.id,
        name: myProduct.name,
        price: myProduct.price,
        oldPrice: myProduct.oldPrice,
        photo: myProduct.photo,
        desc: myProduct.desc
    }
  },
};
