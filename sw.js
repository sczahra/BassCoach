// v24 - service worker intentionally disabled (prevents stale builds on GitHub Pages).
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => self.clients.claim());
