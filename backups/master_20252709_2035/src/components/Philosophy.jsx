import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Users, Rocket, Award, Star, Target } from "lucide-react";

const Philosophy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const values = [
    {
      icon: Heart,
      title: "Pasión por la Innovación",
      description:
        "Cada línea de código, cada solución, nace de nuestra pasión por crear tecnología que marca la diferencia.",
    },
    {
      icon: Users,
      title: "Colaboración Genuina",
      description:
        "Tu éxito es nuestro éxito. Trabajamos codo a codo como verdaderos socios tecnológicos.",
    },
    {
      icon: Rocket,
      title: "Velocidad con Excelencia",
      description:
        "Entregamos rápido sin comprometer la calidad. Agilidad y perfección en cada proyecto.",
    },
    {
      icon: Award,
      title: "Compromiso con Resultados",
      description:
        "Tu visión es nuestra hoja de ruta. No descansamos hasta convertir tus metas en resultados tangibles.",
    },
    {
      icon: Star,
      title: "Calidad Sin Compromisos",
      description:
        "Nuestra arquitectura se construye con los más altos estándares. Nos enfocamos en la excelencia para una calidad inquebrantable.",
    },
    {
      icon: Target,
      title: "Enfoque en el Cliente",
      description:
        "Eres el centro de nuestro ecosistema. Tus objetivos guían cada decisión para construir una solución a tu medida.",
    },
  ];

  return (
    <section id="filosofia" className="py-20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0">
          {/* Network Grid Animation */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern
                id="network"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="1" fill="rgba(37, 99, 235, 0.5)">
                  <animate
                    attributeName="r"
                    values="1;3;1"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="0.5"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="100"
                  stroke="rgba(20, 184, 166, 0.2)"
                  strokeWidth="0.5"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
          </svg>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-blue font-semibold text-sm uppercase tracking-wider">
            El Núcleo de Nuestro Ecosistema
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Valores que nos <span className="gradient-text">Definen</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            En Cloution, creemos que la tecnología debe ser más que código. Es
            el puente hacia un futuro mejor para tu empresa.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl glass-effect border border-white/10 hover:border-neon-blue/30 transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-block mb-4"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all duration-300">
                    <value.icon className="w-6 h-6 text-neon-blue" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative p-8 lg:p-12 rounded-3xl glass-effect border border-white/10 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neon-blue/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-neon-purple/10 to-transparent rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-0.5">
                  <div className="w-full h-full rounded-full bg-galaxy-dark flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Nuestra Misión
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                "Democratizar el acceso a tecnología de vanguardia, empoderando
                a las empresas latinoamericanas para competir y triunfar en el
                escenario global. Creemos que cada negocio, sin importar su
                tamaño, merece las mejores herramientas digitales para alcanzar
                su máximo potencial."
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <span>Innovando desde Colombia</span>
                <span className="text-red-500">❤️</span>
                <span>para el mundo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
