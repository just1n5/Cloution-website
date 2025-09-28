import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ValueCompiler = ({ startDelay = 1000 }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const compilationSteps = [
    { 
      command: '> cloution --analyze-capabilities', 
      delay: 0,
      type: 'command'
    },
    { 
      text: 'Initializing company values...', 
      delay: 800,
      type: 'loading'
    },
    { 
      text: '├── 📦 @cloution/scalability@enterprise', 
      delay: 1200,
      type: 'package',
      description: 'Soluciones que crecen contigo'
    },
    { 
      text: '├── 🤝 @cloution/support@premium', 
      delay: 1600,
      type: 'package',
      description: 'Acompañamiento constante'
    },
    { 
      text: '├── ⚡ @cloution/agility@pro', 
      delay: 2000,
      type: 'package',
      description: 'Implementación rápida'
    },
    { 
      text: '└── 🔒 @cloution/security@enterprise', 
      delay: 2400,
      type: 'package',
      description: 'Máxima confiabilidad'
    },
    { 
      text: '✅ All packages installed successfully', 
      delay: 2800,
      type: 'success'
    },
    { 
      text: '🚀 Ready for deployment!', 
      delay: 3200,
      type: 'ready'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      const stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= compilationSteps.length - 1) {
            clearInterval(stepTimer)
            setIsComplete(true)
            return prev
          }
          return prev + 1
        })
      }, 600)
      
      return () => clearInterval(stepTimer)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [startDelay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: startDelay / 1000 }}
      className="mt-16 mb-8 max-w-2xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="bg-gray-900/50 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 ml-3">cloution-terminal</span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm space-y-2 min-h-[200px]">
          {compilationSteps.slice(0, currentStep + 1).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                {step.type === 'command' && (
                  <span className="text-green-400">{step.command}</span>
                )}
                {step.type === 'loading' && (
                  <span className="text-blue-400 flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⟳
                    </motion.span>
                    {step.text}
                  </span>
                )}
                {step.type === 'package' && (
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-300">{step.text}</span>
                    <span className="text-gray-500 text-xs ml-4">
                      // {step.description}
                    </span>
                  </div>
                )}
                {step.type === 'success' && (
                  <span className="text-green-400 font-medium">{step.text}</span>
                )}
                {step.type === 'ready' && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-gradient-to-r from-blue-400 to-purple-400 font-bold"
                  >
                    {step.text}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Cursor */}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-green-400 ml-1"
            />
          )}
        </div>
      </div>

      {/* Status Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-gray-400">
              <span className="text-green-400">●</span> Sistema listo • 
              <span className="text-blue-400"> Escalable</span> • 
              <span className="text-purple-400"> Cercano</span> • 
              <span className="text-teal-400"> Ágil</span> • 
              <span className="text-orange-400"> Confiable</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ValueCompiler