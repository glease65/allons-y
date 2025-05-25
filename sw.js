// sw.js
const CACHE_NAME = 'time-logger-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './css/base.css',
  './js/app.js',
  './js/timeline.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: cache assets
self.addEventListener('install', event =>
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
);

// Activate: clean up old caches
self.addEventListener('activate', event =>
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
);

// Fetch: serve from cache first, then network
self.addEventListener('fetch', event =>
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
    )
  )
);
