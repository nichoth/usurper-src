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
      console.log('cache open ',cache);
      cache.addAll([
        '/contact'
      ]).then(function() {
        console.log("contact cached");
      });
      return cache.addAll([
        '/',
        '/style.css',
        '/assets/img/bg-bah.png',
        '/assets/img/circle.svg',
        '/assets/img/triangle.svg'
      ]);
    })
  );
});

/**
 * Triggered after a new sw is installed, and the old one is no longer being
 * used. A sw is considered a new version if it's file has a byte of
 * difference from the old one.
 *
 * Here we delete any caches that are not the current version.
 *
 * When you update a SW, update the cache version string too.
 *
 * If you update a static asset, you need to update the cache version.
 */
self.addEventListener('activate', function(ev) {
  console.log("activated: ", arguments);
  ev.waitUntil(
    caches.keys().then(function(cacheKeys) {
      return Promise.all(
        cacheKeys.filter(function(key) {
          return (key !== CACHE_V);
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});

/**
 * This event is triggered for all network requests made against our
 * ServiceWorker's scope.
 *
 * Serve from cache, make request on cache miss.
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
