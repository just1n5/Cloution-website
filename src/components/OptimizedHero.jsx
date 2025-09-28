import React from 'react'
import Hero from './Hero'

/**
 * Wrapper para el componente Hero con optimizaciones
 * Por ahora simplemente re-exporta Hero, pero puede ser extendido en el futuro
 */
const OptimizedHero = (props) => {
  return <Hero {...props} />
}

export default OptimizedHero
