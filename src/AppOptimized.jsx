import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { getPerformanceProfile, PERFORMANCE_CONFIG } from './config/performance'

// Components that load immediately
import Header from './components/Header'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Footer from './components/Footer'

// Optimized particle background
import ParticleBackground from './components/ParticleBackgroundOptimized'

// Lazy load heavy components
const About = lazy(() => import('./components/About'))
const Features = lazy(() => import('./components/Features'))
const Services = lazy(() => import('./components/Services'))
const WebDevPromo = lazy(() => import('./components/WebDevPromo'))
const Philosophy = lazy(() => import('./components/Philosophy'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))

// Component loading fallback
const ComponentLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-gray-500">Cargando...</div>
  </div>
)

// Optimized HomePage with progressive loading
const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    features: false,
    services: false,
    webdev: false,
    philosophy: false,
    cta: false
  })

  useEffect(() => {
    // Progressive section loading based on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const scrollPercentage = (scrollPosition / pageHeight) * 100

      // Load sections progressively based on scroll
      if (scrollPercentage > 20 && !visibleSections.about) {
        setVisibleSections(prev => ({ ...prev, about: true }))
      }
      if (scrollPercentage > 35 && !visibleSections.features) {
        setVisibleSections(prev => ({ ...prev, features: true }))
      }
      if (scrollPercentage > 50 && !visibleSections.services) {
        setVisibleSections(prev => ({ ...prev, services: true }))
      }
      if (scrollPercentage > 65 && !visibleSections.webdev) {
        setVisibleSections(prev => ({ ...prev, webdev: true }))
      }
      if (scrollPercentage > 80 && !visibleSections.philosophy) {
        setVisibleSections(prev => ({ ...prev, philosophy: true }))
      }
      if (scrollPercentage > 90 && !visibleSections.cta) {
        setVisibleSections(prev => ({ ...prev, cta: true }))
      }
    }

    // Initial check
    handleScroll()

    // Throttled scroll listener
    let scrollTimeout
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll()
          scrollTimeout = null
        }, 100)
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Load critical sections after initial render
    setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, about: true, features: true }))
    }, 1000)

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [visibleSections])

  return (
    <>
      <Hero />
      
      <Suspense fallback={<ComponentLoader />}>
        {visibleSections.about && <About />}
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        {visibleSections.features && <Features />}
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        {visibleSections.services && <Services />}
      </Suspense>
      
      <section id="desarrollo-web">
        <Suspense fallback={<ComponentLoader />}>
          {visibleSections.webdev && <WebDevPromo />}
        </Suspense>
      </section>
      
      <Suspense fallback={<ComponentLoader />}>
        {visibleSections.philosophy && <Philosophy />}
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        {visibleSections.cta && <FinalCTA />}
      </Suspense>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [performanceProfile, setPerformanceProfile] = useState('medium')

  useEffect(() => {
    // Determine performance profile
    const profile = getPerformanceProfile()
    setPerformanceProfile(profile)
    
    // Check if all critical resources are loaded
    const checkResourcesLoaded = () => {
      // Check if fonts are loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setIsLoading(false)
        })
      } else {
        // Fallback for browsers that don't support font loading API
        setTimeout(() => setIsLoading(false), 500)
      }
    }

    // Start checking after DOM is ready
    if (document.readyState === 'complete') {
      checkResourcesLoaded()
    } else {
      window.addEventListener('load', checkResourcesLoaded)
    }

    return () => {
      window.removeEventListener('load', checkResourcesLoaded)
    }
  }, [])

  // Preload critical images
  useEffect(() => {
    const criticalImages = [
      '/logo.svg',
      // Add other critical images here
    ]
    
    criticalImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Optimized particle background */}
          {performanceProfile !== 'low' && <ParticleBackground />}

          {/* Contenido principal */}
          <div className="relative z-10">
            <Header />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App
