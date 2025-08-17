const CACHE_NAME = 'blackskullk-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/applications.html',
  '/flashgames.html',
  '/contacts.html',
  '/affiliatesites.html',
  '/manifest.json',
  '/images/bskFavicon32x.png',
  '/images/bskFavicon180x.png',
  '/images/bskFavicon192x192.png',
  '/images/bskFavicon512x512.png',
  '/images/Logo1.png',
  'https://cdn.pixabay.com/audio/2022/07/20/audio_f5519f7e4f.mp3',
  'https://cdn.pixabay.com/audio/2022/01/21/audio_f925028442.mp3'
];

// Installazione del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercettazione delle richieste
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Aggiornamento della cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
