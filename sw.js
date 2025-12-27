// v25 - service worker disabled (no caching). Keeping file to avoid 404s.
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => self.clients.claim());
