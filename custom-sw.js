let staticCacheName = 'neighborhood-map-static-v1';

self.addEventListener('install', function(event) {
  const pathsToCache = [
  '/',
  '/index.html'
];
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(pathsToCache);
    }).catch(function() {
      console.log('Error registering cache.');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) return response;
      return fetch(event.request);
    }).catch(function() {
      console.log('Error with fetch request.');
    })
  )
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('neighborhood-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
