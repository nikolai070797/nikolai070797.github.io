import ToggleLocalization from '@shared/ui/ToggleLocalization/ToggleLocalization';
import type { Meta, StoryObj } from '@storybook/react';

const toggleLocalization: Meta<typeof ToggleLocalization> = {
  component: ToggleLocalization,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default toggleLocalization;
type Story = StoryObj<typeof ToggleLocalization>;

export const Empty: Story = {};
