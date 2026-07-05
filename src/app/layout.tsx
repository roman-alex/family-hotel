import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ServiceWorkerRegistration } from './_components/ServiceWorkerRegistration'
import '../index.css'

export const metadata: Metadata = {
  applicationName: 'FAMILY HOTEL',
  title: {
    default: 'FAMILY HOTEL',
    template: '%s',
  },
  description:
    'FAMILY HOTEL — база відпочинку в Хмельницькій області, с. Куражин.',
  manifest: '/manifests/home.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'FAMILY HOTEL',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/home/apple-touch-icon.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#96C5F7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="uk">
      <head>
        <link
          rel="stylesheet"
          href="/vendor/leaflet/leaflet.css"
        />
      </head>
      <body suppressHydrationWarning>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
