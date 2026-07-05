import type { Metadata } from 'next'
import { HotelRoute } from '../_routes/HotelRoute'

export const metadata: Metadata = {
  applicationName: 'Family Booking',
  title: 'Family Booking',
  description: 'Вільні номери та бронювання FAMILY HOTEL.',
  manifest: '/manifests/booking.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Family Booking',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/booking/pwa-icon.svg',
    apple: '/icons/booking/apple-touch-icon.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
}

export default function HotelPage() {
  return <HotelRoute />
}
