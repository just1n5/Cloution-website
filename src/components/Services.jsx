import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Activity, Brain, Database, Cloud, Code, LineChart, Plus, X } from 'lucide-react'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedService, setExpandedService] = useState(null)

  const services = [
    {
      id: 'pulse',
      title: 'Pulse',
      subtitle: 'Monitoreo en Tiempo Real',
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Sistema de monitoreo y análisis en tiempo real para tu infraestructura.',
      features: [
        'Dashboard personalizado con métricas clave',
        'Alertas inteligentes y predictivas',
        'Integración con más de 100 herramientas',
        'Reportes automatizados y análisis de tendencias',
      ],
      details: 'Pulse es nuestra solución flagship para el monitoreo integral de sistemas. Utilizando IA avanzada, predice fallos antes de que ocurran y optimiza el rendimiento de tu infraestructura 24/7.',
    },
    {
      id: 'lexia',
      title: 'Lexia',
      subtitle: 'Procesamiento de Lenguaje Natural',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      description: 'IA conversacional y análisis de texto para automatizar la comunicación.',
      features: [
        'Chatbots inteligentes multiidioma',
        'Análisis de sentimientos en tiempo real',
        'Extracción automática de información',
        'Generación de contenido personalizado',
      ],
      details: 'Lexia transforma la manera en que tu empresa se comunica. Desde atención al cliente automatizada hasta análisis de documentos complejos, procesamos lenguaje natural con precisión superior al 98%.',
    },
    {
      id: 'datavault',
      title: 'DataVault',
      subtitle: 'Gestión de Datos Empresariales',
      icon: Database,
      gradient: 'from-green-500 to-teal-500',
      description: 'Plataforma unificada para la gestión segura de datos corporativos.',
      features: [
        'Almacenamiento encriptado de grado militar',
        'Sincronización multi-cloud en tiempo real',
        'Control de versiones y auditoría completa',
        'Cumplimiento GDPR y normativas globales',
      ],
      details: 'DataVault centraliza y protege los activos de datos más valiosos de tu empresa. Con encriptación de extremo a extremo y redundancia global, tus datos están seguros y siempre disponibles.',
    },
    {
      id: 'cloudforge',
      title: 'CloudForge',
      subtitle: 'Infraestructura como Código',
      icon: Cloud,
      gradient: 'from-indigo-500 to-blue-500',
      description: 'Automatización y orquestación de infraestructura cloud nativa.',
      features: [
        'Despliegue automatizado multi-cloud',
        'Escalado automático basado en demanda',
        'Optimización de costos con IA',
        'Disaster recovery automatizado',
      ],
      details: 'CloudForge revoluciona la gestión de infraestructura. Despliega, escala y optimiza recursos en AWS, Azure y GCP con un solo clic, reduciendo costos hasta un 40%.',
    },
    {
      id: 'codestream',
      title: 'CodeStream',
      subtitle: 'Desarrollo Ágil Asistido',
      icon: Code,
      gradient: 'from-orange-500 to-red-500',
      description: 'Plataforma de desarrollo colaborativo con IA integrada.',
      features: [
        'Code review automatizado con IA',
        'Sugerencias de código en tiempo real',
        'Testing automatizado y CI/CD',
        'Documentación automática del código',
      ],
      details: 'CodeStream acelera el desarrollo de software hasta 3x. Nuestra IA revisa, sugiere y optimiza código mientras tu equipo se enfoca en la innovación.',
    },
    {
      id: 'insights',
      title: 'Insights Pro',
      subtitle: 'Analítica Avanzada',
      icon: LineChart,
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Business Intelligence y análisis predictivo de próxima generación.',
      features: [
        'Dashboards interactivos en tiempo real',
        'Machine Learning para predicciones',
        'Integración con todas tus fuentes de datos',
        'Reportes ejecutivos automatizados',
      ],
      details: 'Insights Pro convierte datos en decisiones. Con algoritmos de ML avanzados, predecimos tendencias y oportunidades antes que la competencia.',
    },
  ]

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <section id="servicios" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-semibold text-sm uppercase tracking-wider">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Soluciones que <span className="gradient-text">Transforman</span> Negocios
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Suite completa de herramientas empresariales diseñadas para 
            impulsar tu competitividad en la era digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-full rounded-2xl overflow-hidden ${
                  expandedService === service.id ? 'col-span-1 row-span-2' : ''
                }`}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`} />
                <div className="relative h-full p-6 glass-effect border border-white/10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient}`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <p className="text-sm text-gray-400">{service.subtitle}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleService(service.id)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {expandedService === service.id ? (
                        <X className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4">{service.description}</p>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-sm text-gray-400 mb-4">{service.details}</p>
                          <h4 className="text-sm font-semibold text-white mb-3">
                            Características principales:
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2 text-sm text-gray-300"
                              >
                                <span className="text-neon-blue mt-1">•</span>
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 w-full btn-primary text-sm"
                          >
                            Solicitar Demo de {service.title}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quick Stats */}
                  {expandedService !== service.id && (
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Implementación</p>
                        <p className="text-sm font-semibold text-white">2-4 semanas</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">ROI Promedio</p>
                        <p className="text-sm font-semibold gradient-text">+250%</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
