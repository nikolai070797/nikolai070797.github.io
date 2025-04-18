import Home from '@pages/home';
import { default as Layout } from '@shared/ui/layout';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter, MemoryRouter } from 'react-router';
// import { ReactRouterAddonStoryParameters } from 'storybook-addon-remix-react-router';
import { withRouter, reactRouterParameters, reactRouterOutlet } from 'storybook-addon-remix-react-router';

const layout: Meta<typeof Layout> = {
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',  
    reactRouter: reactRouterParameters({
        // routing: reactRouterOutlet(Home),
    }),
  },


  args: {
  },
//   render: () => <Layout />,
  decorators: [withRouter],

//   decorators: [
//     (Story) => (
//         <BrowserRouter>
//         <Layout />
            
//         </BrowserRouter>
//     ),
//   ],
};

export default layout;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
  },
};


