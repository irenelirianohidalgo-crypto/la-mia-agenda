const CACHE_NAME = 'agenda-universitaria-v1';
const assetsToCache = [
  './',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=DM+Serif+Display:ital@0;1&family=Patrick+Hand&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
];

// Installazione: scarica e memorizza le risorse nella cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione e pulizia vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Intercetta le richieste: mostra i file salvati offline se non c'è internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});