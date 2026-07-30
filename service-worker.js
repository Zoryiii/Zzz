// 毓 PWA Service Worker
const CACHE_NAME = 'zhongjingyu-v6';
const CACHE_FILES = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './manifest.json',
  './app-icon.jpg',
  './ai-icon.jpg',
  './public/images/app-icon.jpg',
  './public/images/ai-icon.jpg',
  './public/images/190904.jpg',
  './public/images/190912.jpg',
  './public/images/190916.jpg',
  './public/images/190928.jpg',
  './public/images/190934.jpg',
  './public/images/190935.jpg',
  './public/images/191107.jpg',
  './public/images/191110.jpg',
  './public/images/191112.jpg',
  './public/images/191114.jpg',
  './public/images/205904.jpg',
  './public/images/205912.jpg'
];

// 安装时缓存核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES).catch(err => {
        console.log('部分文件缓存失败，不影响使用:', err);
      });
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 网络请求优先，失败则用缓存（适用于动态内容）
// 核心文件用缓存优先（保证离线可用）
self.addEventListener('fetch', event => {
  const request = event.request;

  // 只处理同源请求
  if (request.url.indexOf(self.location.origin) === -1) {
    return;
  }

  // HTML请求：网络优先（保证更新），失败用缓存
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request).catch(() => caches.match(request).then(resp => resp || caches.match('./index.html')))
    );
    return;
  }

  // 静态资源：缓存优先
  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        // 缓存新资源
        if (response.status === 200 && request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
