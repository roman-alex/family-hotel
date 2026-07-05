'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) {
      return
    }

    async function registerServiceWorker() {
      const registrations = await navigator.serviceWorker.getRegistrations()

      await Promise.all(
        registrations.map((registration) => {
          const scriptUrl =
            registration.active?.scriptURL ??
            registration.installing?.scriptURL ??
            registration.waiting?.scriptURL ??
            ''

          if (scriptUrl && new URL(scriptUrl).pathname !== '/next-sw.js') {
            return registration.unregister()
          }

          return Promise.resolve(false)
        }),
      )

      await navigator.serviceWorker.register('/next-sw.js', { scope: '/' })
    }

    void registerServiceWorker().catch(() => {})
  }, [])

  return null
}
