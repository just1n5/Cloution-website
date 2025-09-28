// Service Worker for Cloution Website
// Version: 1.0.0

const CACHE_NAME = 'cloution-v1';
const RUNTIME_CACHE = 'cloution-runtime-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.svg',
  // Add critical CSS and JS files here after build
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first: For static assets
  cacheFirst: async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  },
  
  // Network first: For API calls and dynamic content
  networkFirst: async (request) => {
    const cache = await caches.open(RUNTIME_CACHE);
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },
  
  // Stale while revalidate: Best for frequently updated resources
  staleWhileRevalidate: async (request) => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
  },
};

// Install event: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch event: Intercept network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Skip WebSocket, EventSource, and other non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Route requests to appropriate cache strategy
  if (request.mode === 'navigate') {
    // HTML pages: Network first
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (request.destination === 'image') {
    // Images: Cache first with long expiry
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // JS/CSS: Stale while revalidate
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API calls: Network first with short cache
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (url.pathname.match(/\.(woff2?|ttf|otf|eot)$/)) {
    // Fonts: Cache first with very long expiry
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else {
    // Default: Stale while revalidate
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request));
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Function to sync offline forms
async function syncForms() {
  // Implementation for syncing offline form data
  // This would connect to your backend when online
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});
