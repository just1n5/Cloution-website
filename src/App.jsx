import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Loader from './components/Loader'
import swManager from './utils/serviceWorkerManager'

// Lazy loading de componentes pesados
const About = lazy(() => import('./components/About'))
const Features = lazy(() => import('./components/Features'))
const Services = lazy(() => import('./components/Services'))
const WebDevPromo = lazy(() => import('./components/WebDevPromo'))
const Philosophy = lazy(() => import('./components/Philosophy'))
const FinalCTA = lazy(() => import('./components/FinalCTA'))
const Footer = lazy(() => import('./components/Footer'))
const ParticleBackground = lazy(() => import('./components/ParticleBackground'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))

// Componente de carga para secciones
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
)

// Componente para la página principal
const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <section id="desarrollo-web">
        <Suspense fallback={<SectionLoader />}>
          <WebDevPromo />
        </Suspense>
      </section>
      <Suspense fallback={<SectionLoader />}>
        <Philosophy />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FinalCTA />
      </Suspense>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula el tiempo de carga de assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Registrar Service Worker
    if (process.env.NODE_ENV === 'production' || window.location.hostname === 'localhost') {
      swManager.register().then((registration) => {
        if (registration) {
          console.log('[App] Service Worker registrado con éxito');
          
          // Precargar recursos críticos
          swManager.precacheResources([
            '/logo.svg',
            '/manifest.json'
          ]);
          
          // Limpiar cachés antiguos
          swManager.cleanupOldCaches();
        }
      });
    }

    // Cleanup
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Fondo de partículas animadas con lazy loading */}
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>

          {/* Contenido principal */}
          <div className="relative z-10">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={
                <Suspense fallback={<SectionLoader />}>
                  <PortfolioPage />
                </Suspense>
              } />
            </Routes>
            <Suspense fallback={<SectionLoader />}>
              <Footer />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}

export default App
