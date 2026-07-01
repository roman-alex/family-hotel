import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'logo.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: {
        name: 'FAMILY HOTEL',
        short_name: 'Family',
        description:
          'FAMILY HOTEL — база відпочинку в Хмельницькій області, с. Куражин.',
        lang: 'uk',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#EEF7FF',
        theme_color: '#96C5F7',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Меню ресторану',
            short_name: 'Меню',
            description: 'Відкрити меню ресторану FAMILY HOTEL',
            url: '/restaurant',
            icons: [
              {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
          {
            name: 'Вільні номери',
            short_name: 'Номери',
            description: 'Переглянути доступні номери FAMILY HOTEL',
            url: '/hotel',
            icons: [
              {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/my\.easyms\.co\/api\/reservation\/pub\/.*$/,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'easyms-api-network-only',
            },
          },
        ],
      },
    }),
  ],
})
