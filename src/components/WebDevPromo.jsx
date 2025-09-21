import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, ArrowRight, Layers, Palette } from 'lucide-react';
import WordPressLogo from '../icons/WordPressLogo.jsx';
import ReactLogo from '../icons/ReactLogo.jsx';

const WebDevPromo = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const technologies = [
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: WordPressLogo,
      description: 'Para plataformas robustas, escalables y fáciles de gestionar por tu equipo.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'react',
      name: 'React JS',
      icon: ReactLogo,
      description: 'Para aplicaciones web ultrarrápidas, interactivas y con experiencias de usuario de vanguardia.',
      color: 'from-cyan-400 to-blue-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // Animación del código transformándose en UI
  const CodeAnimation = () => {
    return (
      <motion.div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
        {/* Contenedor principal de la animación */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          {/* Líneas de código flotantes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 text-blue-400/30 font-mono text-sm"
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: [0, 20, 0],
                y: i * 30 - 60,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {`<div class="component-${i}">`}
            </motion.div>
          ))}

          {/* Wireframe de UI central */}
          <motion.div
            className="relative z-10"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Marco principal */}
            <motion.div
              className="w-64 h-80 border-2 border-blue-500/40 rounded-lg backdrop-blur-sm bg-white/5"
              style={{
                boxShadow: '0 0 40px rgba(37, 99, 235, 0.3)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Header del wireframe */}
              <div className="p-4 border-b border-blue-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
                </div>
              </div>

              {/* Contenido del wireframe */}
              <div className="p-4 space-y-3">
                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"
                  animate={{ width: ['60%', '80%', '60%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="h-2 bg-gradient-to-r from-purple-500/30 to-teal-500/30 rounded"
                  animate={{ width: ['80%', '60%', '80%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Partículas flotantes */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Columna Izquierda - Contenido */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Plataformas Digitales a la Medida de tu Innovación
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Una herramienta inteligente necesita un ecosistema digital que esté a su altura. 
              En Cloution, diseñamos y construimos la presencia online que tu negocio necesita 
              para escalar, integrando nuestras soluciones de automatización en una experiencia 
              de usuario impecable.
            </motion.p>

            {/* Iconos Tecnológicos Interactivos - Glass Effect */}
            <motion.div 
              className="flex gap-6 mt-8"
              variants={itemVariants}
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech.id}
                  className="relative"
                  onMouseEnter={() => setHoveredTech(tech.id)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="
                      w-20 h-20 rounded-xl 
                      glass-effect backdrop-blur-md
                      border border-white/20
                      flex items-center justify-center cursor-pointer
                      relative overflow-hidden
                    "
                    whileHover={{
                      borderColor: tech.id === 'wordpress' ? 'rgba(0, 116, 154, 0.5)' : 'rgba(97, 218, 251, 0.5)',
                      boxShadow: tech.id === 'wordpress' 
                        ? '0 0 30px rgba(0, 116, 154, 0.3)' 
                        : '0 0 30px rgba(97, 218, 251, 0.3)'
                    }}
                  >
                    {/* Subtle background accent */}
                    <div 
                      className={`
                        absolute inset-0 opacity-5
                        ${tech.id === 'wordpress' ? 'bg-blue-500' : 'bg-cyan-400'}
                      `}
                    />
                    
                    {/* Logo */}
                    <tech.icon 
                      size={tech.id === 'wordpress' ? 48 : 36} 
                      className="relative z-10 drop-shadow-sm" 
                      color={tech.id === 'wordpress' ? '#00749a' : '#61dafb'}
                    />
                    
                    {/* Hover border accent */}
                    <motion.div
                      className={`
                        absolute inset-0 rounded-xl border-2 opacity-0
                        ${tech.id === 'wordpress' ? 'border-blue-400/30' : 'border-cyan-400/30'}
                      `}
                      animate={{
                        opacity: hoveredTech === tech.id ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: hoveredTech === tech.id ? 1 : 0,
                      y: hoveredTech === tech.id ? 0 : 10,
                      scale: hoveredTech === tech.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                    className={`
                      absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3
                      w-64 p-3 bg-slate-800/95 backdrop-blur-md rounded-lg
                      border border-blue-500/30 pointer-events-none
                      ${hoveredTech === tech.id ? 'visible' : 'invisible'}
                    `}
                    style={{
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <p className="text-white font-semibold mb-1">{tech.name}</p>
                    <p className="text-gray-300 text-sm">{tech.description}</p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-slate-800 border-r border-b border-blue-500/30"></div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Botón CTA */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="/portafolio-web"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(37, 99, 235, 0.3)';
                }}
              >
                <Sparkles className="w-5 h-5" />
                Explora Nuestro Portafolio Web
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Badges adicionales */}
            <motion.div 
              className="flex flex-wrap gap-3 mt-6"
              variants={itemVariants}
            >
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400">
                <Code2 className="inline w-4 h-4 mr-2" />
                +50 Proyectos
              </span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400">
                <Palette className="inline w-4 h-4 mr-2" />
                UX/UI Premium
              </span>
              <span className="px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-sm text-teal-400">
                <Layers className="inline w-4 h-4 mr-2" />
                Full Stack
              </span>
            </motion.div>
          </motion.div>

          {/* Columna Derecha - Animación Visual */}
          <motion.div 
            variants={itemVariants}
            className="relative lg:pl-8"
          >
            <CodeAnimation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevPromo;