// Offline support: every file the app loads is cached. Online, the network wins so updates arrive; offline, the cache answers.
const CACHE = 'kitsune-road'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith('http')) return
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone()
        if (res.ok || res.type === 'opaque') caches.open(CACHE).then((c) => c.put(e.request, copy))
        return res
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit ?? caches.match('./'))),
  )
})
