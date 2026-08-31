import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Audace Rabarison — Portfolio',
        short_name: 'Audace Portfolio',
        description: "Portfolio d'Audace Rabarison, Software Engineer",
        lang: 'fr',
        start_url: '/portfolio/',
        scope: '/portfolio/',
        display: 'standalone',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        id: '/portfolio/',
        icons: [
          { src: '/portfolio/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/portfolio/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,webp,svg,pdf}'],
      },
    }),
  ],
  base: '/portfolio/',
})
