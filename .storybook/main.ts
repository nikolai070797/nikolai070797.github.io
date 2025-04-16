import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm',
    {
      name: 'storybook-addon-remix-react-router',
      // options: {
      //   routerVersion: 7, // Явно указываем версию
      // },
    },
  ],
  framework: {
    // Работает
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite-sb.config.ts',
      },
    },
  },
  // framework: '@storybook/react-vite', // Не работает
  docs: {
    autodocs: 'tag',
  },
};

export default config;
