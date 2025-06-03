import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import { env } from 'process';
import path, { resolve } from 'path';
import child_process from 'child_process';

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== '' ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;

const certificateName = 'OTUS.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
      { stdio: 'inherit' }
    ).status
  ) {
    throw new Error('Could not create certificate.');
  }
}

export default defineConfig({
  plugins: [/*react(), */ tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    open: false,
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
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
