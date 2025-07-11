import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/TrendSpot/', 
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
})
