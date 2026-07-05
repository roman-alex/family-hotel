import type { Metadata } from 'next'
import { RestaurantRoute } from '../_routes/RestaurantRoute'

export const metadata: Metadata = {
  applicationName: 'Family Restaurant',
  title: 'Family Restaurant',
  description: 'Меню ресторану FAMILY HOTEL.',
  manifest: '/manifests/restaurant.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Family Restaurant',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/restaurant/pwa-icon.svg',
    apple: '/icons/restaurant/apple-touch-icon.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
}

export default function RestaurantPage() {
  return <RestaurantRoute />
}
