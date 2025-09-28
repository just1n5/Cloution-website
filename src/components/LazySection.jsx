import React, { lazy, Suspense, useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * Componente para cargar secciones de forma lazy cuando están cerca del viewport
 * @param {string} component - Ruta del componente a cargar
 * @param {object} props - Props a pasar al componente
 * @param {number} threshold - Qué tan cerca del viewport debe estar para cargar (default 200px)
 * @param {React.Component} fallback - Componente de carga mientras se carga la sección
 */
const LazySection = ({ 
  component, 
  threshold = '200px',
  fallback = null,
  ...props 
}) => {
  const [Component, setComponent] = useState(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: threshold,
    threshold: 0
  })

  useEffect(() => {
    if (inView && !hasLoaded) {
      const loadComponent = async () => {
        try {
          const module = await import(`./${component}.jsx`)
          setComponent(() => module.default)
          setHasLoaded(true)
        } catch (error) {
          console.error('Error loading component:', error)
        }
      }
      loadComponent()
    }
  }, [inView, component, hasLoaded])

  const defaultFallback = (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Cargando sección...</p>
      </div>
    </div>
  )

  return (
    <div ref={ref}>
      {Component ? (
        <Suspense fallback={fallback || defaultFallback}>
          <Component {...props} />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  )
}

export default LazySection
