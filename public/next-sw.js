const CACHE_NAME = 'family-hotel-next-static-v3'
const EASYMS_API_ORIGIN = 'https://my.easyms.co'
const CACHEABLE_DESTINATIONS = new Set(['font', 'script', 'style'])
const CACHE_PREFIXES_TO_DELETE = [
  'family-hotel-next-',
  'workbox-',
  'vite-',
  'easyms-api-network-only',
]
const NETWORK_ONLY_PATH_PREFIXES = ['/restaurant/', '/images/dishes/']

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName !== CACHE_NAME &&
                CACHE_PREFIXES_TO_DELETE.some((prefix) =>
                  cacheName.startsWith(prefix),
                ),
            )
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin === EASYMS_API_ORIGIN) {
    event.respondWith(fetch(new Request(request, { cache: 'no-store' })))
    return
  }

  if (
    url.origin === self.location.origin &&
    NETWORK_ONLY_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
  ) {
    event.respondWith(fetch(new Request(request, { cache: 'no-store' })))
    return
  }

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    request.mode === 'navigate' ||
    !CACHEABLE_DESTINATIONS.has(request.destination)
  ) {
    return
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const networkResponse = await fetch(request)

        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone())
        }

        return networkResponse
      } catch {
        const cachedResponse = await cache.match(request)

        if (cachedResponse) {
          return cachedResponse
        }

        throw new Error(`Network request failed for ${request.url}`)
      }
    }),
  )
})
