import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fastor-api': {
        target: 'https://staging.fastor.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fastor-api/, ''),
      },
    },
  },
});
