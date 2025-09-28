import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Filter,
  Globe,
  ShoppingCart,
  Building2,
  Code2,
  Sparkles,
  Mail,
  User,
  FileText,
  ChevronRight,
  Clock,
  Target,
  Brush,
  Rocket,
  Shield,
  Play,
  Eye,
  Award,
  TrendingUp
} from 'lucide-react';
import { portfolioProjects, workProcess, portfolioStats } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  projectType: '',
  description: ''
};

// IMPORTANTE: Para configurar el formulario correctamente:
// 1. Abre src/config/formConfig.js
// 2. Reemplaza 'tu-email@ejemplo.com' con tu email real
// 3. O sigue las instrucciones en FORMULARIO_FIX.md para usar Google Forms

// Configuración temporal - ACTUALIZAR con los IDs correctos del formulario
// Enlace del formulario: https://forms.gle/cQYQMFmVXEEZmRpU6
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdNR8LdWXRiSNCdBj4iJacptpNQRXt4MfVXJTYq7HNpleclJA/formResponse';

const GOOGLE_FORM_FIELDS = {
  name: 'entry.1077888602',
  email: 'entry.1858443603',
  projectType: 'entry.1817360050',
  description: 'entry.1015762588'
};

// Configuración alternativa usando FormSubmit (más confiable)
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/cloutionsas@gmail.com'; 

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Usar los proyectos del archivo de datos
  const projects = portfolioProjects;

  // Filtros disponibles con iconos
  const filters = [
    { id: 'todos', label: 'Todos', icon: Globe },
    { id: 'wordpress', label: 'WordPress', icon: Globe },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'corporativo', label: 'Corporativo', icon: Building2 },
    { id: 'profesional', label: 'Profesional', icon: Shield },
    { id: 'salud', label: 'Salud', icon: Shield },
    { id: 'restaurante', label: 'Restaurante', icon: ShoppingCart },
    { id: 'premium', label: 'Premium', icon: Award }
  ];

  // Usar el proceso del archivo de datos con iconos de Lucide
  const processSteps = workProcess.map(step => ({
    ...step,
    icon: step.number === '01' ? Target : 
          step.number === '02' ? Brush :
          step.number === '03' ? Code2 : Rocket
  }));

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'todos') return true;
    return project.category.includes(activeFilter);
  });

  useEffect(() => {
    if (!submitStatus) return;
    const timeout = setTimeout(() => setSubmitStatus(null), 5000);
    return () => clearTimeout(timeout);
  }, [submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Método 1: Intentar con FormSubmit (más confiable)
    try {
      const formSubmitResponse = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          description: formData.description,
          _subject: 'Nuevo mensaje desde Portfolio Cloution',
          _template: 'table',
          _captcha: false
        })
      });

      if (formSubmitResponse.ok) {
        const data = await formSubmitResponse.json();
        if (data.success) {
          setSubmitStatus('success');
          setFormData({ ...INITIAL_FORM_DATA });
          setIsSubmitting(false);
          return;
        }
      }
    } catch (error) {
      console.log('FormSubmit falló, intentando con Google Forms...', error);
    }

    // Método 2: Respaldo con Google Forms
    try {
      const payload = new FormData();
      payload.append(GOOGLE_FORM_FIELDS.name, formData.name);
      payload.append(GOOGLE_FORM_FIELDS.email, formData.email);
      payload.append(GOOGLE_FORM_FIELDS.projectType, formData.projectType);
      payload.append(GOOGLE_FORM_FIELDS.description, formData.description);

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      });
      
      // Con no-cors no podemos verificar la respuesta, asumimos éxito
      setSubmitStatus('success');
      setFormData({ ...INITIAL_FORM_DATA });
    } catch (error) {
      console.error('Error enviando formulario', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setShowProjectModal(false);
  };

  // Project Card Component
  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handleCardClick = (e) => {
      // Prevenir que el click abra el modal si es en un botón específico
      if (e.target.closest('.no-modal-trigger')) {
        return;
      }
      openProjectModal(project);
    };

    return (
      <motion.div
        className="relative group cursor-pointer"
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onClick={handleCardClick}
        onMouseEnter={() => {
          setIsHovered(true);
          if (project.video) {
            setTimeout(() => setShowVideo(true), 300);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowVideo(false);
          setIsVideoLoaded(false);
        }}
      >
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
          style={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(37, 99, 235, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Imagen del proyecto con responsive */}
          <div className="aspect-[4/3] overflow-hidden relative">
            {/* Video (si existe y hover) */}
            {project.video && showVideo && (
              <>
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
                <video
                  src={project.video}
                  className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                />
              </>
            )}
            
            {/* Imagen por defecto */}
            <motion.img
              src={project.images.desktop}
              alt={project.name}
              className="w-full h-full object-cover object-top"
              animate={{ scale: isHovered && !showVideo ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
            {/* Badge de año y tooltip */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">{project.year}</span>
            </div>
            
            {/* Indicador de Click (tooltip) */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white text-xs font-medium flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Click para ver detalles
              </span>
            </motion.div>
            
            {/* Overlay en hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.name}
                </motion.h3>
                
                <motion.p
                  className="text-gray-300 mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Cliente y Resultado */}
                <motion.div
                  className="flex items-center gap-4 text-sm text-gray-400 mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  <span>Cliente: {project.client}</span>
                  <span className="text-green-400">✓ {project.result}</span>
                </motion.div>
                
                {/* Tecnologías */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full text-xs text-gray-300">
                      +{project.technologies.length - 3} más
                    </span>
                  )}
                </motion.div>
                
                {/* CTA Botón */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </button>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-modal-trigger flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Sitio en vivo
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Información básica siempre visible */}
          <div className="p-4 bg-slate-900/50">
            <h4 className="text-lg font-semibold text-white mb-1">{project.name}</h4>
            <p className="text-sm text-gray-400 mb-2">{project.client}</p>
            <div className="flex items-center gap-2">
              {project.features.slice(0, 2).map((feature, i) => (
                <span key={i} className="text-xs text-gray-500">• {feature}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-x-hidden">
      {/* Efectos de fondo decorativos */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-teal-600/10"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Creamos Experiencias Web
              </span>
              <br />
              <span className="text-white">
                que Convierten y Deslumbran
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explora nuestros proyectos desarrollados con la versatilidad de WordPress 
              y el poder de React JS.
            </motion.p>

            {/* Filtros */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <motion.button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      px-6 py-3 rounded-full font-medium transition-all duration-300
                      flex items-center gap-2
                      ${activeFilter === filter.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700/50'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-b border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {portfolioStats.clientsServed}
              </motion.div>
              <p className="text-gray-400">Clientes Felices</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
              >
                {portfolioStats.satisfactionRate}
              </motion.div>
              <p className="text-gray-400">Satisfacción</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              >
                {portfolioStats.averageIncrease}
              </motion.div>
              <p className="text-gray-400">Crecimiento Promedio</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
              >
                {portfolioStats.yearsExperience}
              </motion.div>
              <p className="text-gray-400">Años de Experiencia</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-12"
              layout
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-xl">No hay proyectos en esta categoría</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Metodología probada para entregar proyectos excepcionales
            </p>
          </motion.div>

          <div className="relative">
            {/* Línea de conexión de fondo para desktop */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Línea vertical para móvil/tablet */}
                    {index < processSteps.length - 1 && (
                      <div className="block md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                    )}
                    
                    <motion.div 
                      className="relative text-center"
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Número del paso */}
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl font-bold text-blue-500/10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        {step.number}
                      </motion.div>

                      {/* Icono container */}
                      <motion.div
                        className="relative w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center group"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: '0 25px 50px rgba(37, 99, 235, 0.4)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {/* Efecto de resplandor */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                        <Icon className="relative w-12 h-12 text-blue-400" />
                        
                        {/* Indicador de estado activo */}
                        <motion.div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </motion.div>
                      
                      {/* Contenido */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <p className="text-sm text-gray-400 px-4">{step.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA con Formulario */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-md rounded-2xl border border-blue-500/30 p-8 lg:p-12">
              <div className="text-center mb-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="inline-block text-6xl mb-6"
                >
                  🚀
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  ¿Tienes un proyecto en mente?
                </h2>
                <p className="text-xl text-gray-300">
                  Cuéntanos tu visión y hagámosla realidad juntos
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Code2 className="inline w-4 h-4 mr-2" />
                    Tipo de Proyecto
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="wordpress">WordPress</option>
                    <option value="react">React JS</option>
                    <option value="unsure">No estoy seguro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Breve descripción del proyecto
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    rows="4"
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y necesidades..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto mx-auto block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={isSubmitting ? undefined : { scale: 1.05 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.95 }}
                  style={{
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <Sparkles className="inline w-5 h-5 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Propuesta'}
                  <ChevronRight className="inline w-5 h-5 ml-2" />
                </motion.button>
                <div className="text-center text-sm" aria-live="polite">
                  {submitStatus === 'success' && (
                    <p className="text-green-400 mt-4">¡Gracias! Revisaremos tu mensaje y nos pondremos en contacto pronto.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 mt-4">Hubo un problema al enviar el formulario. Inténtalo de nuevo.</p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={showProjectModal}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
};

export default PortfolioPage;