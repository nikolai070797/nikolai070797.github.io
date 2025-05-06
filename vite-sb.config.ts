import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: { open: false},
  resolve: {
      alias: {
        '@locales': resolve(__dirname, './src/app/localization/locales'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          assetFileNames: (assetInfo) => {
            const { name } = assetInfo;
            if (name?.endsWith('.json') && name.includes('locales')) {
              return 'locales/[name][extname]';
            }
            // Добавляем обработку других файлов
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
});