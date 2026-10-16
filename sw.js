const CACHE = 'plan-zajec-v3';

// Instalacja i wymuszenie natychmiastowej aktualizacji
self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      './',
      './index.html',
      './data.js',
      './manifest.webmanifest',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
});

// Automatyczne czyszczenie starych wersji z pamięci telefonu/komputera
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if (k !== CACHE) return caches.delete(k);
      })
    ))
  );
});

// Pobieranie (Najpierw Internet, jeśli brak internetu -> Pamięć offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});