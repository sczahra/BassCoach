const CACHE = "basscoach-v21";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/pitch.js",
  "/midi.js",
  "/manifest.webmanifest",
  "/legacy.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === CACHE ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Only handle same-origin GET
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((resp) => {
        // Update cache for navigations/assets
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(()=>{});
        return resp;
      }).catch(() => cached);
    })
  );
});
