import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '@locales': resolve(__dirname, './src/app/localization/locales'),
    },
  },
  build: {
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, 'index.html'),
      // },
      output: {
        assetFileNames: (assetInfo) => {
          const { names } = assetInfo;
          if (names.includes('locales')) {
            return 'locales/[name][extname]';
          }
          // Добавляем обработку других файлов
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
