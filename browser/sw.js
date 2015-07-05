require('whatwg-fetch');
require('serviceworker-cache-polyfill');
var CACHE_V = 'v1';

/**
 * This event is triggered during install/registration of the ServiceWorker.
 */
self.addEventListener('install', function(ev) {
  console.log('Serviceworker installed!');
  ev.waitUntil(
    caches.open(CACHE_V).then(function(cache) {
      console.log(cache);
      return cache.addAll([
        '/',
        '/style.css',
        '/image.jpeg'
      ]);
    })
  );
});

self.addEventListener('activate', function() {
  console.log("activated: ", arguments);
});

/**
 * This event is triggered for all network requests made against our
 * ServiceWorker's scope.
 *
 * Serve from cache, make request on cache miss, then cache the response.
 */
self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event ', event.request.url, event);
  event.respondWith(
    caches.match(event.request)  // serve from cache
      .then(function(resp) {
        console.log("cache hit: ", resp.url);
        return resp;
      }).catch(function() {  // handle cache miss
        console.log("cache miss", event.request.url);
        return fetch(event.request);
      })
  );
});
