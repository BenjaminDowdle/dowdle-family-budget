// Keeps the app available offline. Bump VERSION when you replace the files so phones pick up the update.
const VERSION = 'budget-v3';
const SHELL = ['./', 'index.html', 'config.js', 'supabase.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  const name = url.pathname.split('/').pop() || 'index.html';
  const isShell = SHELL.includes(name) || SHELL.includes('./') && (url.pathname.endsWith('/') );
  if (req.method !== 'GET' || url.origin !== location.origin || !isShell) return;
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const hit = await cache.match(req, {ignoreSearch: true});
      const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
      if (hit) { net.catch(() => {}); return hit; }
      return (await net) || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
    })
  );
});