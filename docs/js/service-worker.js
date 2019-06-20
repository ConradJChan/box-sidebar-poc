const CACHE = 'poc-cache-v1';
const urlsToCache = [
    '/',
    'https://cdn01.boxcdn.net/polyfills/core-js/2.5.3/core.min.js',
    'https://cdn01.boxcdn.net/platform/elements/10.1.0/en-US/sidebar.js',
    'https://cdn01.boxcdn.net/platform/elements/10.1.0/en-US/sidebar.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(() => {
          return caches.match('/offline.html');
      })
    );
});
