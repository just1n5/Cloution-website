import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import PortfolioPage from './pages/PortfolioPage'

// Componente para la página principal
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Services />
      <section id="desarrollo-web">
        <WebDevPromo />
      </section>
      <Philosophy />
      <FinalCTA />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reducir tiempo de carga a 1 segundo
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App
