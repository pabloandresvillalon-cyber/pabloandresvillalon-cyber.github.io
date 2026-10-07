// PV GYM: funciona sin conexión guardando la app en caché.
const CACHE = "pv-gym-v1";
const CORE = ["./", "index.html", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "maskable-512.png", "favicon-32.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Página principal: primero la red (para recibir actualizaciones), si no hay señal, la copia guardada.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { caches.open(CACHE).then(c => c.put("index.html", r.clone())); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Íconos y tipografías: primero la caché.
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && (url.origin === location.origin || url.host.includes("fonts."))) {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return r;
  })));
});
