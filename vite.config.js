import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE === 'true' && visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  build: {
    sourcemap: process.env.NODE_ENV !== 'production' ? true : false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'react';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('react-helmet-async')) return 'helmet';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
