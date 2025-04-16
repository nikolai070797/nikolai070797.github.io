// import react from '@vitejs/plugin-react';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// import reactRouter from 'vite-plugin-react-router-generator';

export default defineConfig({
  plugins: [/*react(), */ tailwindcss(), reactRouter(), tsconfigPaths()],
  
});
