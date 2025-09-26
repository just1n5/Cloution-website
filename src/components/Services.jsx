import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Activity,
  Brain,
  Database,
  Cloud,
  Code,
  LineChart,
  Plus,
  X,
} from "lucide-react";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: "pulse",
      title: "Pulse",
      subtitle: "Control total de tu productividad.",
      icon: Activity,
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Pulse es una solución intuitiva para el monitoreo y la gestión de los tiempos de trabajo de tu equipo.",
      features: [
        "Monitoreo de tareas en tiempo real",
        "Integración con sistemas de nómina para una gestión automáticas",
        "Alertas de puntualidad y llegadas tardías",
        "Análisis detallado de productividad por empleado y proyecto",
      ],
      details:
        "Te permite ver las métricas de productividad de cada tarea, optimizar procesos y asegurar la puntualidad, todo en un solo lugar. Con Pulse, mejora la eficiencia de tu equipo y toma decisiones informadas basadas en datos precisos.",
    },
    {
      id: "lexia",
      title: "Lexia",
      subtitle: "El futuro de la práctica legal",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      description:
        "Lexia es tu asistente jurídico impulsado por inteligencia artificial, diseñado para automatizar las tareas más intensivas de tu trabajo. Transforma horas de gestión y búsqueda en minutos, permitiendo que tu equipo se concentre en lo que realmente importa: tu cliente.",
      features: [
        "Seguimiento de casos automatizado y en tiempo real",
        "Gestión inteligente de documentos y expedientes",
        "Búsqueda avanzada de jurisprudencia para un análisis preciso.",
        "Análisis de texto para identificar puntos clave en documentos extensos",
        "Notificaciones inteligentes sobre hitos procesales importantes.",
      ],
      details:
        "La inteligencia artificial de Lexia va más allá de la simple automatización. Analizamos y estructuramos grandes volúmenes de datos legales para darte información precisa y relevante, permitiendo que tomes decisiones estratégicas de forma más rápida y segura.",
    },
    {
      id: "NEXO POS",
      title: "NEXO POS",
      subtitle: "La fusión de tu punto de venta y contabilidad.",
      icon: Database,
      gradient: "from-green-500 to-teal-500",
      description:
        "Nexo POS es el sistema operativo de tu negocio. Unifica tu punto de venta y contabilidad en una sola plataforma, eliminando la doble digitación y el error manual para que te enfoques en crecer.",
      features: [
        "Integración nativa con contabilidad en tiempo real",
        "Facturación electrónica con cumplimiento garantizado ante la DIAN",
        "Gestión integral de ventas, clientes e inventario",
        "Reportes financieros y fiscales automáticos",
        "Automatización total para eliminar errores manuales",
      ],
      details:
        "Más que una simple caja registradora, Nexo POS garantiza el cumplimiento normativo con la DIAN y te proporciona reportes financieros automáticos para que tomes decisiones estratégicas en tiempo real.",
    },
  ];

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

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
            Soluciones que <span className="gradient-text">Transforman</span>{" "}
            Negocios
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Suite completa de herramientas empresariales diseñadas para impulsar
            tu competitividad en la era digital
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
                  expandedService === service.id ? "col-span-1 row-span-2" : ""
                }`}
              >
                {/* Card Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}
                />
                <div className="relative h-full p-6 glass-effect border border-white/10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient}`}
                      >
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {service.subtitle}
                        </p>
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
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-sm text-gray-400 mb-4">
                            {service.details}
                          </p>
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
                        <p className="text-sm font-semibold text-white">
                          2-4 semanas
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">ROI Promedio</p>
                        <p className="text-sm font-semibold gradient-text">
                          +250%
                        </p>
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
  );
};

export default Services;
