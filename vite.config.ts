// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/TrendSpot/',
  plugins: [react()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
