import { ClientForm } from '@features/forms/ClientForm';
import type { Meta, StoryObj } from '@storybook/react';

const clientForm: Meta<typeof ClientForm> = {
  component: ClientForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default clientForm;
type Story = StoryObj<typeof ClientForm>;

export const Default: Story = {};

export const WithDefaultValues: Story = {
  args: {
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '5555555555',
      id: '',
      about: '12345',
    },
  },
};

export const WithErrors: Story = {
  args: {
    defaultValues: {
      name: '',
      email: 'john.doe',
      phone: '555-555-5555',
      id: '',
      about: '123',
    },
  },
};
