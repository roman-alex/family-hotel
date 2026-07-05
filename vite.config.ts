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
        'icons/home/icon-192.png',
        'icons/home/icon-512.png',
        'icons/home/apple-touch-icon.png',
        'icons/booking/icon-192.png',
        'icons/booking/icon-512.png',
        'icons/booking/apple-touch-icon.png',
        'icons/restaurant/icon-192.png',
        'icons/restaurant/icon-512.png',
        'icons/restaurant/apple-touch-icon.png',
        'manifests/home.webmanifest',
        'manifests/booking.webmanifest',
        'manifests/restaurant.webmanifest',
      ],
      manifest: false,
      workbox: {
        navigateFallbackDenylist: [/^\/booking\//, /^\/restaurant-app\//],
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
