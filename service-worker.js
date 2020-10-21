const CACHE_NAME = 'chaches-v1'

const urlsToCache = [
  '/',
  '/manifest.json',
  '/img/apple-touch-icon.png',
  '/img/icon-192x192.png',
  '/img/icon-256x256.png',
  '/img/icon-384x384.png',
  '/img/icon-512x512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/src/index.html',
  '/src/nav.html',
  '/src/index.js',
  '/src/detail.html',
  '/src/detail.js',
  '/css/materialize.css',
  '/js/materialize.js',
  '/src/js/api.js',
  '/src/js/db.js',
  '/src/js/idb.js',
  '/src/js/nav.js',
  '/src/pages/home.html',
  '/src/pages/favorite.html'
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  const BASE_URL = 'https://api.football-data.org/v2/'
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const response = await fetch(event.request)
        cache.put(event.request.url, response.clone())
        return response
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch(event.request)
      })
    )
  }
})

self.addEventListener('push', function (event) {
  var body
  if (event.data) {
    body = event.data.text()
  } else {
    body = 'Push message with payload'
  }
  const options = {
    body: body,
    icon: 'img/notification.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  )
})
