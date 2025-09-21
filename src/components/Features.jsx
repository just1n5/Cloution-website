import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Zap, TrendingUp, Lightbulb, ArrowUpRight, Sparkles } from 'lucide-react'

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [hoveredFeature, setHoveredFeature] = useState(null)

  // Filosofía SEVI - Los 4 Pilares
  const features = [
    {
      letter: 'S',
      icon: Shield,
      title: 'Seguridad',
      subtitle: 'Protección Total',
      description: 'Infraestructura blindada con encriptación de nivel militar, cumplimiento normativo y protección proactiva contra amenazas.',
      color: 'from-blue-500 to-cyan-500',
      stats: '99.99% Uptime',
      delay: 0.1,
    },
    {
      letter: 'E',
      icon: TrendingUp,
      title: 'Escalabilidad',
      subtitle: 'Crecimiento Ilimitado',
      description: 'Arquitectura cloud-native que se adapta dinámicamente a tu demanda, desde startups hasta corporaciones globales.',
      color: 'from-purple-500 to-pink-500',
      stats: '∞ Capacidad',
      delay: 0.2,
    },
    {
      letter: 'V',
      icon: Zap,
      title: 'Velocidad',
      subtitle: 'Rendimiento Extremo',
      description: 'Respuesta instantánea con tecnología edge computing, optimización automática y despliegue continuo.',
      color: 'from-green-500 to-teal-500',
      stats: '<100ms Latencia',
      delay: 0.3,
    },
    {
      letter: 'I',
      icon: Lightbulb,
      title: 'Innovación',
      subtitle: 'Futuro Presente',
      description: 'IA generativa, machine learning avanzado y tecnologías emergentes integradas en cada solución.',
      color: 'from-orange-500 to-red-500',
      stats: 'Next-Gen Tech',
      delay: 0.4,
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* SEVI Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-bold text-sm tracking-wider">FILOSOFÍA SEVI</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Los <span className="gradient-text">4 Pilares</span> de Nuestra Excelencia
          </h2>
          
          {/* SEVI Acronym Display */}
          <motion.div 
            className="flex justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                <span 
                  className={`text-6xl lg:text-7xl font-black bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                  style={{ textShadow: '0 0 30px rgba(37, 99, 235, 0.3)' }}
                >
                  {feature.letter}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            <strong className="text-white">SEVI</strong> es más que un acrónimo, es nuestro compromiso 
            con la excelencia tecnológica. Cada pilar sustenta nuestra promesa de 
            transformación digital integral.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: feature.delay }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl glass-effect border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20">
                {/* SEVI Letter Watermark */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className={`text-7xl font-black bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    {feature.letter}
                  </span>
                </div>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="relative mb-4 z-10"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5`}>
                    <div className="w-full h-full rounded-xl bg-galaxy-dark flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: hoveredFeature === index ? 1 : 0.9,
                      opacity: hoveredFeature === index ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} animate-pulse`}></div>
                    <span className="text-xs text-gray-300 font-medium">{feature.stats}</span>
                  </motion.div>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: hoveredFeature === index ? 1 : 0,
                    x: hoveredFeature === index ? 0 : -10
                  }}
                  className="absolute bottom-6 right-6"
                >
                  <ArrowUpRight className="w-5 h-5 text-white/50" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEVI Philosophy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              El Método SEVI®
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nuestra metodología exclusiva <strong className="text-white">SEVI</strong> garantiza que cada proyecto 
              cumpla con los más altos estándares de <span className="text-blue-400">Seguridad</span>, 
              sea infinitamente <span className="text-purple-400">Escalable</span>, 
              opere con <span className="text-green-400">Velocidad</span> óptima, 
              e integre la <span className="text-orange-400">Innovación</span> más avanzada del mercado.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Conoce Más Sobre SEVI
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features