import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Users, Award, CheckCircle, Trophy } from 'lucide-react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!project || !isOpen) return null

  // Preparar array de imágenes
  const projectImages = project.images ? [
    project.images.desktop,
    project.images.mobile,
    project.images.tablet
  ].filter(Boolean) : []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-galaxy-dark/95 backdrop-blur-xl rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-galaxy-dark via-galaxy-violet to-galaxy-dark p-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'En Línea' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/30 text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name || project.title}</h2>
                <p className="text-lg text-gray-300">{project.client || 'Cliente'}</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={projectImages[activeImageIndex]}
                      alt={`${project.name || project.title} - Vista ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {projectImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-2">
                    {projectImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          index === activeImageIndex 
                            ? 'border-neon-blue' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Descripción del Proyecto</h3>
                    <p className="text-gray-300 leading-relaxed">{project.description || project.fullDescription}</p>
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                      <p className="text-gray-300 italic mb-3">"{project.testimonial.text}"</p>
                      <p className="text-white font-semibold">{project.testimonial.author}</p>
                      <p className="text-sm text-gray-400">{project.testimonial.position}</p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Tecnologías Utilizadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Características Principales</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  {project.metrics && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Métricas de Éxito</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(project.metrics).map(([key, value], index) => (
                          <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                            <p className="text-2xl font-bold text-blue-400">{value}</p>
                            <p className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Result */}
                  {project.result && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                      <Trophy className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold text-white mb-2">Resultado Principal</h3>
                      <p className="text-2xl font-bold text-green-400">{project.result}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 btn-primary"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ver Proyecto
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 btn-secondary"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
