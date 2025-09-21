import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Rocket, ArrowRight, Shield, Award, Star, CheckCircle } from 'lucide-react'

const FinalCTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const badges = [
    { icon: Shield, text: 'ISO 27001' },
    { icon: Award, text: 'Partner Microsoft' },
    { icon: Star, text: 'Google Cloud' },
    { icon: CheckCircle, text: 'AWS Advanced' },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-teal opacity-10" />
              
              {/* Glass Effect Container */}
              <div className="relative glass-effect border border-white/20 p-12 lg:p-16">
                {/* Floating Rocket Animation */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-8 text-6xl opacity-20 lg:opacity-100"
                >
                  🚀
                </motion.div>

                {/* Content */}
                <div className="text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                      ¿Preparado para
                      <span className="block gradient-text mt-2">Transformar tu Negocio?</span>
                    </h2>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-300 mb-8"
                  >
                    Únete a más de 500 empresas que ya confían en Cloution para 
                    liderar su transformación digital. El futuro es ahora.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative btn-primary px-8 py-4 text-lg overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Agendar Consultoría Gratuita
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary px-8 py-4 text-lg flex items-center gap-2"
                    >
                      <Rocket className="w-5 h-5" />
                      Ver Casos de Éxito
                    </motion.button>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-400 mb-4">Certificaciones y Partners:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {badges.map((badge, index) => (
                        <motion.div
                          key={badge.text}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect border border-white/10"
                        >
                          <badge.icon className="w-4 h-4 text-neon-blue" />
                          <span className="text-sm text-gray-300">{badge.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Urgency Message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30"
                  >
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                    <span className="text-sm text-neon-blue">
                      3 espacios disponibles para consultoría este mes
                    </span>
                  </motion.div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10 rounded-br-3xl" />
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-neon-blue/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA
