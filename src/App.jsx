import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Services from './components/Services'
import WebDevPromo from './components/WebDevPromo'
import Philosophy from './components/Philosophy'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula el tiempo de carga de assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

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
          {/* Fondo de partículas animadas */}
          <ParticleBackground />
          
          {/* Contenido principal */}
          <div className="relative z-10">
            <Header />
            <Hero />
            <About />
            <Features />
            <Services />
            <section id="desarrollo-web">
              <WebDevPromo />
            </section>
            <Philosophy />
            <FinalCTA />
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App
