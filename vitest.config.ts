import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
      css: true,
      reporters: ['verbose'],
      alias: {
        '@locales': new URL('./src/app/localization/locales', import.meta.url).pathname,
      },
      coverage: {
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*'],
      },
      server: {
        deps: {
          inline: ['@react-router/dev'],
        },
      },
    },
  })
);
