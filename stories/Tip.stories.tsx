import Tip from '@features/Tip';
import { TipPlace } from '@features/Tip/ui/Tip';
import { Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const tip: Meta<typeof Tip> = {
  component: Tip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default tip;

type Story = StoryObj<typeof Tip>;

export const Top: Story = {
  args: {
    place: TipPlace.top,
    children: <Typography>Element with top title</Typography>,
    title: <Typography>Top title</Typography>,
  },
};

export const Left: Story = {
  args: {
    place: TipPlace.left,
    children: <Typography>Element with left title</Typography>,
    title: <Typography>Left title</Typography>,
  },
};

export const Right: Story = {
  args: {
    place: TipPlace.right,
    children: <Typography>Element with right title</Typography>,
    title: <Typography>Right title</Typography>,
  },
};

export const Bottom: Story = {
  args: {
    place: TipPlace.bottom,
    children: <Typography>Element with bottom title</Typography>,
    title: <Typography>Bottom title</Typography>,
  },
};

export const Scroll: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', gap: '1rem', width: '200vw', height: '150vh' }}>
      <Tip place={TipPlace.top} title={<Typography>My custom title TOP</Typography>} delayHide={10000}>
        <Typography>TOP</Typography>
      </Tip>
      <Tip place={TipPlace.left} title={<Typography>My custom title LEFT</Typography>} delayHide={10000}>
        <Typography>LEFT</Typography>
      </Tip>
      <Tip place={TipPlace.right} title={<Typography>My custom title RIGHT</Typography>} delayHide={10000}>
        <Typography>RIGHT</Typography>
      </Tip>
      <Tip place={TipPlace.bottom} title={<Typography>My custom title Bottom</Typography>} delayHide={10000}>
        <Typography>BOTTOM</Typography>
      </Tip>
    </div>
  ),
};
