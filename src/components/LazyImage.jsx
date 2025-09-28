import React, { useState, useEffect, useRef } from 'react'

/**
 * Componente de imagen optimizada con lazy loading
 * @param {string} src - URL de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} placeholder - URL de la imagen placeholder (baja resolución)
 * @param {string} className - Clases CSS
 * @param {object} ...props - Props adicionales
 */
const LazyImage = ({ 
  src, 
  alt, 
  placeholder,
  className = '',
  objectFit = 'cover',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [imageRef, setImageRef] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const observerRef = useRef()

  useEffect(() => {
    let observer
    
    if (imageRef && !isLoaded) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setIsInView(true)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0,
            rootMargin: '50px'
          }
        )
        observer.observe(imageRef)
      } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        setIsInView(true)
      }
    }

    observerRef.current = observer

    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [imageRef, isLoaded])

  useEffect(() => {
    if (isInView && !isLoaded) {
      const imageLoader = new Image()
      imageLoader.src = src
      imageLoader.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      imageLoader.onerror = () => {
        console.error('Error loading image:', src)
        // Opcionalmente, establecer una imagen de error por defecto
        setImageSrc(placeholder || '')
      }
    }
  }, [isInView, src, isLoaded, placeholder])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`
          w-full h-full transition-all duration-700 ease-out
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
          ${!isLoaded ? 'filter blur-lg scale-110' : 'filter blur-0 scale-100'}
        `}
        {...props}
      />
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default LazyImage
