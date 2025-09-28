/**
 * Service Worker Registration and Management
 * Cloution Website - v2.0.0
 */

class ServiceWorkerManager {
  constructor() {
    this.registration = null;
    this.updateAvailable = false;
    this.offlineMode = !navigator.onLine;
  }

  /**
   * Registrar el Service Worker
   */
  async register() {
    // Verificar si el navegador soporta Service Workers
    if (!('serviceWorker' in navigator)) {
      console.log('[SW Manager] Service Workers no soportados');
      return null;
    }

    try {
      // Esperar a que la página cargue completamente
      await this.waitForWindowLoad();

      // Registrar el Service Worker
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js',
        { scope: '/' }
      );

      this.registration = registration;
      console.log('[SW Manager] Service Worker registrado:', registration.scope);

      // Configurar listeners
      this.setupListeners(registration);
      
      // Verificar actualizaciones
      this.checkForUpdates(registration);

      return registration;
    } catch (error) {
      console.error('[SW Manager] Error al registrar Service Worker:', error);
      return null;
    }
  }

  /**
   * Esperar a que la ventana cargue
   */
  waitForWindowLoad() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });
  }

  /**
   * Configurar event listeners
   */
  setupListeners(registration) {
    // Detectar cuando hay una actualización disponible
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.updateAvailable = true;
          this.notifyUpdate();
        }
      });
    });

    // Detectar cambios en el estado de conexión
    window.addEventListener('online', () => {
      this.offlineMode = false;
      this.notifyOnline();
    });

    window.addEventListener('offline', () => {
      this.offlineMode = true;
      this.notifyOffline();
    });

    // Escuchar mensajes del Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleMessage(event.data);
    });
  }

  /**
   * Verificar actualizaciones del Service Worker
   */
  async checkForUpdates(registration) {
    // Verificar actualizaciones cada 60 segundos
    setInterval(async () => {
      try {
        await registration.update();
      } catch (error) {
        console.error('[SW Manager] Error verificando actualizaciones:', error);
      }
    }, 60000);
  }

  /**
   * Notificar al usuario sobre actualización disponible
   */
  notifyUpdate() {
    // Crear notificación personalizada
    const notification = this.createNotification(
      '🚀 Nueva versión disponible',
      'Actualiza para obtener las últimas mejoras',
      'update'
    );

    // Botón de actualización
    const updateButton = notification.querySelector('.notification-action');
    updateButton.addEventListener('click', () => {
      this.applyUpdate();
    });

    // Mostrar notificación
    this.showNotification(notification);
  }

  /**
   * Aplicar actualización del Service Worker
   */
  async applyUpdate() {
    if (!this.updateAvailable || !this.registration) return;

    const waiting = this.registration.waiting;
    if (!waiting) return;

    // Enviar mensaje para skipWaiting
    waiting.postMessage({ type: 'SKIP_WAITING' });

    // Recargar cuando el nuevo SW tome control
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }

  /**
   * Notificar modo offline
   */
  notifyOffline() {
    const notification = this.createNotification(
      '📡 Sin conexión',
      'Estás trabajando en modo offline',
      'offline'
    );
    
    this.showNotification(notification);
  }

  /**
   * Notificar vuelta online
   */
  notifyOnline() {
    const notification = this.createNotification(
      '✅ Conexión restaurada',
      'Ya estás conectado a Internet',
      'online'
    );
    
    this.showNotification(notification, 3000);
  }

  /**
   * Crear elemento de notificación
   */
  createNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `sw-notification sw-notification--${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <h4 class="notification-title">${title}</h4>
        <p class="notification-message">${message}</p>
      </div>
      ${type === 'update' ? '<button class="notification-action">Actualizar ahora</button>' : ''}
    `;

    // Estilos inline para la notificación
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'offline' ? '#ff6b6b' : type === 'online' ? '#51cf66' : '#339af0'};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
      max-width: 350px;
    `;

    return notification;
  }

  /**
   * Mostrar notificación
   */
  showNotification(notification, duration = 0) {
    // Agregar al DOM
    document.body.appendChild(notification);

    // Auto-ocultar si se especifica duración
    if (duration > 0) {
      setTimeout(() => {
        this.hideNotification(notification);
      }, duration);
    }

    // Click para cerrar
    notification.addEventListener('click', (e) => {
      if (!e.target.classList.contains('notification-action')) {
        this.hideNotification(notification);
      }
    });
  }

  /**
   * Ocultar notificación
   */
  hideNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  /**
   * Manejar mensajes del Service Worker
   */
  handleMessage(data) {
    switch (data.type) {
      case 'CACHE_UPDATED':
        console.log('[SW Manager] Caché actualizado');
        break;
      case 'OFFLINE_READY':
        console.log('[SW Manager] Listo para modo offline');
        break;
      default:
        console.log('[SW Manager] Mensaje recibido:', data);
    }
  }

  /**
   * Precargar recursos críticos
   */
  async precacheResources(urls) {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open('cloution-precache-v2');
      await cache.addAll(urls);
      console.log('[SW Manager] Recursos precargados:', urls.length);
    } catch (error) {
      console.error('[SW Manager] Error precargando recursos:', error);
    }
  }

  /**
   * Limpiar cachés antiguos
   */
  async cleanupOldCaches() {
    if (!('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith('cloution-') && 
        !name.includes('v2')
      );

      await Promise.all(oldCaches.map(name => caches.delete(name)));
      console.log('[SW Manager] Cachés antiguos eliminados:', oldCaches.length);
    } catch (error) {
      console.error('[SW Manager] Error limpiando cachés:', error);
    }
  }

  /**
   * Obtener estadísticas de caché
   */
  async getCacheStats() {
    if (!('caches' in window)) {
      return { supported: false };
    }

    try {
      const cacheNames = await caches.keys();
      const stats = {
        supported: true,
        caches: [],
        totalSize: 0
      };

      for (const name of cacheNames) {
        if (name.startsWith('cloution-')) {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          stats.caches.push({
            name,
            items: keys.length
          });
        }
      }

      return stats;
    } catch (error) {
      console.error('[SW Manager] Error obteniendo estadísticas:', error);
      return { supported: true, error: error.message };
    }
  }

  /**
   * Desregistrar Service Worker (útil para desarrollo/debugging)
   */
  async unregister() {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (const registration of registrations) {
        await registration.unregister();
      }

      // Limpiar todos los cachés
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      console.log('[SW Manager] Service Worker desregistrado y cachés limpiados');
      return true;
    } catch (error) {
      console.error('[SW Manager] Error al desregistrar:', error);
      return false;
    }
  }
}

// CSS para las notificaciones
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .notification-content {
    flex: 1;
  }

  .notification-title {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
  }

  .notification-message {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
  }

  .notification-action {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .notification-action:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Exportar instancia única
const swManager = new ServiceWorkerManager();

export default swManager;
