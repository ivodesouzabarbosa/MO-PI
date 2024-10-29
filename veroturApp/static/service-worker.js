const CACHE_NAME = 'verotur-cache-v1';
const urlsToCache = [
  '/',
  // CSS
  '/static/Home/css/header_footer.css',
  '/static/Home/css/nova_home.css',
  '/static/style/map.css',
  '/static/mapa/css/mapa.css',
  // JS
  '/static/scripts/map.js',
  '/static/Home/js/config.js',
  '/static/Home/js/home.js',
  // IMG
  '/static/Home/img/veroTur_logo-pwa.png',
  '/static/Home/img/brasil.png',
  '/static/Home/img/engles.png',
  '/static/Home/img/estacao_doca_desktop_trem_mobile.png',
  '/static/Home/img/estacao_doca_desktop.png',
  '/static/Home/img/estacao_doca.png',
  '/static/Home/img/facebook.png',
  '/static/Home/img/forte_do_presepio_desktop.png',
  '/static/Home/img/forte_do_presepio_mobile.png',
  '/static/Home/img/forte_do_presepio.png',
  '/static/Home/img/instagram.png',
  '/static/Home/img/lista.webp',
  '/static/Home/img/senac_footer.png',
  '/static/Home/img/senac_home.webp',
  '/static/Home/img/senac_logo_r.png',
  '/static/Home/img/ver_o_peso_mobile.png',
  '/static/Home/img/veroTur_logo.webp',
  '/offline',  // Adicione aqui o fallback offline, caso exista
  // Adicione mais arquivos aqui
];

// Instala o Service Worker e cacheia os arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.error('Falha ao cachear arquivos:', error))
  );
});

// Intercepta as requisições e serve do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request).catch(() => {
          // Fallback para offline
          return caches.match('/offline');
        });
      })
  );
});

// Atualiza o Service Worker e remove caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
