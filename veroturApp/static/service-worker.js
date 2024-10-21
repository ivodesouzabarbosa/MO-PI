self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('django-app-cache').then((cache) => {
        return cache.addAll([
          '/',
        // Html -----------------------------------------
          '/templates/index.html',
        // js -------------------------------------------
          '/static/scripts/map.js',
          '/static/Home/js/config.js',
          '/static/Home/js/home.js',
        // imagens ----------------------------------------
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
        // css -------------------------------------------------  
          '/static/Home/css/header_footer.css',
          '/static/Home/css/nova_home.css',
          '/static/style/map.css',
        ]);
      })
    );
  });
  
 // Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições para servir os arquivos cacheados
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna o arquivo do cache, se disponível
        }
        return fetch(event.request); // Caso contrário, busca da rede
      })
  );
});