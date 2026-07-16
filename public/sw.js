self.addEventListener("install", (event) => {
  console.log("Service Worker instalado.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado.");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Por enquanto não vamos interceptar requisições.
});