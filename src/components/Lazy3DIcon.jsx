import React, { lazy, Suspense, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// Mapeo de iconos 3D para lazy loading
const icon3DComponents = {
  'FrontendIcon3D': () => import('../icons/FrontendIcon3D.jsx'),
  'BackendIcon3D': () => import('../icons/BackendIcon3D.jsx'),
  'CloudDevOpsIcon3D': () => import('../icons/CloudDevOpsIcon3D.jsx'),
  'SecurityIcon3D': () => import('../icons/SecurityIcon3D.jsx'),
  'AiDataIcon3D': () => import('../icons/AiDataIcon3D.jsx'),
  'UxUiIcon3D': () => import('../icons/UxUiIcon3D.jsx'),
  'ApisAutomationIcon3D': () => import('../icons/ApisAutomationIcon3D.jsx'),
  'WordPressLogo': () => import('../icons/WordPressLogo.jsx'),
  'ReactLogo': () => import('../icons/ReactLogo.jsx'),
}

/**
 * Wrapper para cargar iconos 3D de forma lazy y optimizada
 * @param {string} iconName - Nombre del icono 3D a cargar
 * @param {object} props - Props a pasar al icono
 * @param {boolean} preload - Si debe precargar el icono inmediatamente
 */
const Lazy3DIcon = ({ 
  iconName, 
  fallback = null,
  preload = false,
  threshold = '100px',
  ...props 
}) => {
  const [Icon3D, setIcon3D] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: threshold,
    threshold: 0,
    skip: preload // Si preload es true, no usa IntersectionObserver
  })

  useEffect(() => {
    const shouldLoad = preload || inView
    
    if (shouldLoad && !Icon3D && !isLoading && !error) {
      setIsLoading(true)
      
      const loadIcon = async () => {
        try {
          if (icon3DComponents[iconName]) {
            const module = await icon3DComponents[iconName]()
            setIcon3D(() => module.default)
          } else {
            throw new Error(`Icon ${iconName} not found`)
          }
        } catch (err) {
          console.error('Error loading 3D icon:', err)
          setError(err.message)
        } finally {
          setIsLoading(false)
        }
      }
      
      loadIcon()
    }
  }, [inView, preload, iconName, Icon3D, isLoading, error])

  // Fallback por defecto con animación y estilo
  const defaultFallback = (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/10 rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  )

  // Fallback de error
  const errorFallback = (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">3D</p>
      </div>
    </div>
  )

  // Si hay error, mostrar fallback de error
  if (error) {
    return errorFallback
  }

  return (
    <div ref={ref} className="w-full h-full">
      {Icon3D ? (
        <Suspense fallback={fallback || defaultFallback}>
          <Icon3D {...props} />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  )
}

export default Lazy3DIcon
