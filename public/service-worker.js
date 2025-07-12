const CACHE_NAME = "movie-app-cache-v1";
const urlsToCache = ["/", "/index.html", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((response) => {
        return response || fetch(event.request);
      }).catch(() => caches.match("/offline.html"))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      }).catch(() => caches.match("/offline.html"))
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
