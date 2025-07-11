import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ 추가
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
