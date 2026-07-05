import type { Metadata } from 'next'
import { RestaurantRoute } from '../_routes/RestaurantRoute'

export const metadata: Metadata = {
  applicationName: 'Family Menu',
  title: 'Family Menu',
  description: 'Меню ресторану FAMILY HOTEL.',
  manifest: '/manifests/restaurant.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Family Menu',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/restaurant/apple-touch-icon.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
}

export default function RestaurantPage() {
  return <RestaurantRoute />
}
