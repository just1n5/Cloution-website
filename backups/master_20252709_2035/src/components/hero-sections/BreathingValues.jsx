import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BreathingValues = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const values = [
    { word: 'Escalable', color: 'text-blue-400', description: 'Crece contigo' },
    { word: 'Cercano', color: 'text-purple-400', description: 'Siempre presente' },
    { word: 'Ágil', color: 'text-green-400', description: 'Resultados rápidos' },
    { word: 'Confiable', color: 'text-orange-400', description: 'Máxima seguridad' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-16 mb-8 text-center"
    >
      {/* Main breathing text */}
      <div className="relative h-16 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-2xl md:text-3xl font-light text-gray-300"
        >
          Somos{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className={`font-bold ${values[activeIndex].color}`}
            >
              {values[activeIndex].word.toLowerCase()}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Subtle description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-500 mt-2"
        >
          {values[activeIndex].description}
        </motion.p>
      </AnimatePresence>

      {/* Progress indicators */}
      <div className="flex justify-center gap-1 mt-6">
        {values.map((_, index) => (
          <motion.div
            key={index}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              index === activeIndex 
                ? `w-8 ${values[index].color.replace('text-', 'bg-')}` 
                : 'w-2 bg-gray-700'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default BreathingValues