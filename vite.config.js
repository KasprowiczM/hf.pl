import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE === 'true' &&
      !process.env.CI &&
      visualizer({
        filename: './dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: [
      { find: /^motion$/, replacement: 'framer-motion' },
    ],
  },
  build: {
    target: 'baseline-widely-available',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react/')) return 'react'
          if (id.includes('/node_modules/i18next') || id.includes('/node_modules/react-i18next')) return 'i18n'
          if (id.includes('/node_modules/lucide-react')) return 'icons'
          if (id.includes('/node_modules/three')) return 'three'
          if (id.includes('/node_modules/@react-three/fiber')) return 'r3f'
          if (id.includes('/node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
