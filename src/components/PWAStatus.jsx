import React, { useState, useEffect } from 'react';
import { X, Wifi, WifiOff, Download, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import swManager from '../utils/serviceWorkerManager';

/**
 * Componente para mostrar el estado PWA y gestionar el Service Worker
 */
const PWAStatus = () => {
  const [showStatus, setShowStatus] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistered, setSwRegistered] = useState(false);
  const [cacheStats, setCacheStats] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Verificar estado online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificar Service Worker
    checkServiceWorker();

    // Verificar instalabilidad PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Verificar actualizaciones
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }

    // Obtener estadísticas de caché
    loadCacheStats();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      setSwRegistered(!!registration);
    }
  };

  const loadCacheStats = async () => {
    const stats = await swManager.getCacheStats();
    setCacheStats(stats);
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA instalada');
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleUpdateSW = () => {
    swManager.applyUpdate();
  };

  const handleClearCache = async () => {
    if (confirm('¿Estás seguro de que quieres limpiar todo el caché?')) {
      await swManager.unregister();
      window.location.reload();
    }
  };

  if (!showStatus) {
    // Botón flotante minimalista
    return (
      <button
        onClick={() => setShowStatus(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 group"
        title="Estado PWA"
      >
        {isOnline ? (
          <Wifi className="w-5 h-5" />
        ) : (
          <WifiOff className="w-5 h-5 animate-pulse" />
        )}
        {updateAvailable && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Estado PWA</h3>
          <button
            onClick={() => setShowStatus(false)}
            className="hover:bg-white/20 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Estado de conexión */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Conexión
          </span>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Service Worker */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Service Worker
          </span>
          <div className="flex items-center gap-2">
            {swRegistered ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">Activo</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-yellow-600 dark:text-yellow-400">Inactivo</span>
              </>
            )}
          </div>
        </div>

        {/* Estadísticas de caché */}
        {cacheStats && cacheStats.supported && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Caché
            </span>
            {cacheStats.caches && cacheStats.caches.map((cache, index) => (
              <div key={index} className="text-xs text-gray-600 dark:text-gray-400 pl-4">
                {cache.name}: {cache.items} elementos
              </div>
            ))}
          </div>
        )}

        {/* Actualización disponible */}
        {updateAvailable && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Nueva versión disponible
              </span>
              <button
                onClick={handleUpdateSW}
                className="text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>
        )}

        {/* Instalación PWA */}
        {isInstallable && (
          <button
            onClick={handleInstallPWA}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Instalar App</span>
          </button>
        )}

        {/* Acciones */}
        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={loadCacheStats}
            className="flex-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-1.5 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Refrescar estadísticas"
          >
            <RefreshCw className="w-3 h-3 mx-auto" />
          </button>
          <button
            onClick={handleClearCache}
            className="flex-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 py-1.5 px-2 rounded hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            title="Limpiar caché"
          >
            Limpiar Caché
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAStatus;
