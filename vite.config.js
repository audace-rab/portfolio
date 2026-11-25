import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// Vercel sert le site à la racine ; GitHub Pages sous /portfolio/
const base = process.env.VERCEL ? '/' : '/portfolio/'

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
        start_url: base,
        scope: base,
        display: 'standalone',
        theme_color: '#F9F9FB',
        background_color: '#F9F9FB',
        id: base,
        icons: [
          { src: `${base}pwa-192x192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${base}pwa-512x512.png`, sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,webp,svg,pdf}'],
      },
    }),
  ],
  base,
})
