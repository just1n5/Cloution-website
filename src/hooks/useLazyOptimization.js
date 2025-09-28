import { useEffect, useState, useCallback } from 'react'

/**
 * Hook para precargar componentes y recursos cuando el navegador está idle
 */
export const usePrefetch = () => {
  const [isPrefetching, setIsPrefetching] = useState(false)

  const prefetchComponent = useCallback(async (componentPath) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(async () => {
        try {
          await import(componentPath)
        } catch (error) {
          console.error('Error prefetching component:', error)
        }
      })
    }
  }, [])

  const prefetchRoute = useCallback((routePath) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = routePath
        document.head.appendChild(link)
      })
    }
  }, [])

  const prefetchImage = useCallback((imageSrc) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const img = new Image()
        img.src = imageSrc
      })
    }
  }, [])

  return {
    prefetchComponent,
    prefetchRoute,
    prefetchImage,
    isPrefetching
  }
}

/**
 * Hook para detectar conexión lenta y ajustar la carga de recursos
 */
export const useNetworkStatus = () => {
  const [connectionType, setConnectionType] = useState('4g')
  const [saveData, setSaveData] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    if ('connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      
      const updateConnectionStatus = () => {
        setConnectionType(connection.effectiveType || '4g')
        setSaveData(connection.saveData || false)
        setIsSlowConnection(
          connection.saveData || 
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g' ||
          connection.effectiveType === '3g'
        )
      }

      updateConnectionStatus()
      connection.addEventListener('change', updateConnectionStatus)
      
      return () => {
        connection.removeEventListener('change', updateConnectionStatus)
      }
    }
  }, [])

  return {
    connectionType,
    saveData,
    isSlowConnection
  }
}

/**
 * Hook para cargar recursos basado en la prioridad y el viewport
 */
export const useLazyLoad = (threshold = '200px') => {
  const [elements, setElements] = useState(new Set())
  const [loaded, setLoaded] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded.has(entry.target)) {
            setLoaded(prev => new Set([...prev, entry.target]))
            
            // Trigger lazy load
            if (entry.target.dataset.src) {
              entry.target.src = entry.target.dataset.src
              entry.target.removeAttribute('data-src')
            }
            
            // Dispatch custom event for component lazy loading
            entry.target.dispatchEvent(new CustomEvent('lazyload'))
          }
        })
      },
      {
        rootMargin: threshold,
        threshold: 0
      }
    )

    elements.forEach(element => {
      observer.observe(element)
    })

    return () => {
      elements.forEach(element => {
        observer.unobserve(element)
      })
    }
  }, [elements, loaded, threshold])

  const observe = useCallback((element) => {
    if (element && !elements.has(element)) {
      setElements(prev => new Set([...prev, element]))
    }
  }, [elements])

  return {
    observe,
    loaded: loaded.size,
    isLoaded: (element) => loaded.has(element)
  }
}

export default {
  usePrefetch,
  useNetworkStatus,
  useLazyLoad
}
