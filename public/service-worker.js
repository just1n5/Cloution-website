// Service Worker para Cloution Website
// Version: 2.0.0
// Última actualización: Diciembre 2024

const CACHE_VERSION = 'cloution-v2.0.0';
const RUNTIME_CACHE = 'cloution-runtime-v2';
const IMAGE_CACHE = 'cloution-images-v2';
const STATIC_CACHE = 'cloution-static-v2';
const VENDOR_CACHE = 'cloution-vendor-v2';

// Recursos críticos para precache (shell de la aplicación)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  // CSS principal se agregará dinámicamente
];

// Patrones de URL para diferentes estrategias de caché
const CACHE_STRATEGIES = {
  // Cache First - Recursos que raramente cambian
  cacheFirst: [
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,  // Imágenes
    /^https:\/\/fonts\.(googleapis|gstatic)\.com/,  // Google Fonts
    /\.(?:woff|woff2|ttf|otf)$/i,  // Fonts locales
  ],
  
  // Network First - Contenido dinámico
  networkFirst: [
    /\/api\//,  // API calls
    /\/portfolio\//,  // Datos del portfolio
    /\.json$/,  // Archivos JSON (excepto manifest)
  ],
  
  // Stale While Revalidate - Balance entre velocidad y frescura
  staleWhileRevalidate: [
    /\.(?:js|css)$/,  // JavaScript y CSS
    /^https:\/\/cdn/,  // CDN resources
    /vendor-.*\.js$/,  // Vendor bundles
  ],
  
  // Solo Network - Nunca cachear
  networkOnly: [
    /\/sockjs-node/,  // Hot reload en desarrollo
    /hot-update/,  // Hot Module Replacement
    /\/admin/,  // Rutas administrativas
  ]
};

// Límites de caché
const CACHE_LIMITS = {
  images: 60,  // Máximo 60 imágenes
  pages: 20,   // Máximo 20 páginas
  static: 30,  // Máximo 30 recursos estáticos
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando versión:', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      
      // Intentar cachear recursos críticos
      try {
        await cache.addAll(PRECACHE_URLS);
        console.log('[Service Worker] Recursos críticos en caché');
      } catch (error) {
        console.error('[Service Worker] Error en precache:', error);
      }
      
      // Saltar waiting y activar inmediatamente
      await self.skipWaiting();
    })()
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando versión:', CACHE_VERSION);
  
  event.waitUntil(
    (async () => {
      // Limpiar cachés antiguos
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => {
            return name.startsWith('cloution-') && 
                   name !== CACHE_VERSION &&
                   name !== RUNTIME_CACHE &&
                   name !== IMAGE_CACHE &&
                   name !== STATIC_CACHE &&
                   name !== VENDOR_CACHE;
          })
          .map(name => {
            console.log('[Service Worker] Eliminando caché antiguo:', name);
            return caches.delete(name);
          })
      );
      
      // Tomar control de todos los clientes
      await self.clients.claim();
    })()
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar peticiones que no sean GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorar peticiones de extensiones del navegador
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }
  
  // Determinar estrategia de caché
  const strategy = getStrategy(url, request);
  
  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(request));
      break;
    case 'network-first':
      event.respondWith(networkFirst(request));
      break;
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(request));
      break;
    case 'network-only':
      event.respondWith(fetch(request));
      break;
    default:
      // Por defecto, stale-while-revalidate
      event.respondWith(staleWhileRevalidate(request));
  }
});

// Estrategia Cache First
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    // Devolver desde caché
    return cached;
  }
  
  try {
    // Si no está en caché, buscar en red
    const response = await fetch(request);
    
    // Guardar en caché si la respuesta es válida
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Si falla la red y no hay caché, devolver fallback
    return getFallbackResponse(request);
  }
}

// Estrategia Network First
async function networkFirst(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  
  try {
    // Intentar red primero con timeout
    const response = await fetchWithTimeout(request, 3000);
    
    // Guardar en caché si es exitoso
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Si falla la red, buscar en caché
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Si no hay caché, devolver fallback
    return getFallbackResponse(request);
  }
}

// Estrategia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(VENDOR_CACHE);
  const cached = await cache.match(request);
  
  // Actualizar caché en background
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Devolver caché si existe, sino esperar red
  return cached || fetchPromise;
}

// Fetch con timeout
async function fetchWithTimeout(request, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(request, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Determinar estrategia según URL
function getStrategy(url, request) {
  const urlString = url.href;
  
  // Network only
  for (const pattern of CACHE_STRATEGIES.networkOnly) {
    if (pattern.test(urlString)) {
      return 'network-only';
    }
  }
  
  // Cache first
  for (const pattern of CACHE_STRATEGIES.cacheFirst) {
    if (pattern.test(urlString)) {
      return 'cache-first';
    }
  }
  
  // Network first
  for (const pattern of CACHE_STRATEGIES.networkFirst) {
    if (pattern.test(urlString)) {
      return 'network-first';
    }
  }
  
  // Stale while revalidate (default para JS/CSS)
  for (const pattern of CACHE_STRATEGIES.staleWhileRevalidate) {
    if (pattern.test(urlString)) {
      return 'stale-while-revalidate';
    }
  }
  
  // Default
  return 'stale-while-revalidate';
}

// Respuesta fallback para offline
function getFallbackResponse(request) {
  const url = new URL(request.url);
  
  // Para páginas HTML, mostrar página offline
  if (request.headers.get('accept')?.includes('text/html')) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sin Conexión - Cloution</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: -apple-system, system-ui, sans-serif;
          }
          .offline-container {
            text-align: center;
            padding: 2rem;
            color: white;
          }
          .offline-icon {
            width: 120px;
            height: 120px;
            margin: 0 auto 2rem;
            opacity: 0.9;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 2rem;
          }
          .retry-btn {
            padding: 12px 24px;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .retry-btn:hover {
            transform: scale(1.05);
          }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <svg class="offline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"/>
          </svg>
          <h1>Sin Conexión</h1>
          <p>Parece que no tienes conexión a Internet.<br>Por favor, verifica tu conexión e intenta nuevamente.</p>
          <button class="retry-btn" onclick="location.reload()">Reintentar</button>
        </div>
      </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }
  
  // Para imágenes, devolver placeholder
  if (request.headers.get('accept')?.includes('image')) {
    // SVG placeholder
    return new Response(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#f0f0f0" width="400" height="300"/>
        <text fill="#999" font-family="sans-serif" font-size="18" text-anchor="middle" x="200" y="150">
          Imagen no disponible offline
        </text>
      </svg>
    `, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  }
  
  // Para otros recursos, respuesta genérica
  return new Response('Recurso no disponible offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Limpiar cachés antiguos periódicamente
async function cleanupCaches() {
  const cache = await caches.open(IMAGE_CACHE);
  const keys = await cache.keys();
  
  // Si excede el límite, eliminar los más antiguos
  if (keys.length > CACHE_LIMITS.images) {
    const toDelete = keys.slice(0, keys.length - CACHE_LIMITS.images);
    await Promise.all(toDelete.map(key => cache.delete(key)));
  }
}

// Mensaje desde la página principal
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CLEANUP_CACHES') {
    cleanupCaches();
  }
});

console.log('[Service Worker] Script cargado');
