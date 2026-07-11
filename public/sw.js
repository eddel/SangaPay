const CACHE_NAME = "sangapay-shell-v1";
const OFFLINE_URL = "/offline";
const SHELL_ASSETS = ["/", "/app", OFFLINE_URL, "/manifest.webmanifest", "/icons/icon-192.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then(async (response) => {
          if (response && response.status === 200 && event.request.url.startsWith(self.location.origin)) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, response.clone());
          }

          return response;
        })
        .catch(async () => {
          if (cached) {
            return cached;
          }

          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }

          return new Response("Offline", { status: 503, statusText: "Offline" });
        });

      return cached || networkFetch;
    }),
  );
});
