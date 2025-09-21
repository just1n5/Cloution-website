import React, { useState } from 'react';
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
  Shield
} from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: ''
  });

  // Datos de proyectos simulados
  const projects = [
    {
      id: 1,
      slug: 'clinica-dental-sonrie',
      name: 'Clínica Dental Sonríe',
      category: ['wordpress', 'corporativo'],
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Elementor', 'MySQL'],
      description: 'Plataforma integral con sistema de citas online'
    },
    {
      id: 2,
      slug: 'tienda-eco-verde',
      name: 'EcoVerde Store',
      category: ['react', 'ecommerce'],
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'Stripe'],
      description: 'E-commerce de productos sustentables'
    },
    {
      id: 3,
      slug: 'dashboard-analytics-pro',
      name: 'Analytics Pro Dashboard',
      category: ['react', 'corporativo'],
      image: '/api/placeholder/600/400',
      technologies: ['React', 'D3.js', 'Firebase'],
      description: 'Dashboard de análisis en tiempo real'
    },
    {
      id: 4,
      slug: 'moda-boutique',
      name: 'Moda Boutique',
      category: ['wordpress', 'ecommerce'],
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'WooCommerce', 'PayPal'],
      description: 'Tienda online de alta costura'
    },
    {
      id: 5,
      slug: 'fintech-solutions',
      name: 'FinTech Solutions',
      category: ['react', 'corporativo'],
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'AWS'],
      description: 'Portal financiero con blockchain'
    },
    {
      id: 6,
      slug: 'restaurante-gourmet',
      name: 'Restaurante Gourmet',
      category: ['wordpress', 'corporativo'],
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Custom Theme', 'OpenTable'],
      description: 'Sitio con reservas y menú interactivo'
    }
  ];

  const filters = [
    { id: 'todos', label: 'Todos', icon: Globe },
    { id: 'wordpress', label: 'WordPress', icon: Globe },
    { id: 'react', label: 'React JS', icon: Code2 },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'corporativo', label: 'Corporativo', icon: Building2 }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Estrategia y UX',
      description: 'Análisis profundo de objetivos y usuarios',
      icon: Target
    },
    {
      number: '02',
      title: 'Diseño UI y Prototipado',
      description: 'Creación de interfaces atractivas y funcionales',
      icon: Brush
    },
    {
      number: '03',
      title: 'Desarrollo y QA',
      description: 'Programación con las mejores prácticas',
      icon: Code2
    },
    {
      number: '04',
      title: 'Despliegue y Soporte',
      description: 'Lanzamiento exitoso y mantenimiento continuo',
      icon: Rocket
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'todos') return true;
    return project.category.includes(activeFilter);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí iría la lógica de envío del formulario
  };

  // Project Card Component
  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.a
        href={`/portafolio/${project.slug}`}
        className="relative block group cursor-pointer"
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
          style={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(37, 99, 235, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Imagen del proyecto */}
          <div className="aspect-[4/3] overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            
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
                  className="text-gray-300 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Tecnologías */}
                <motion.div
                  className="flex gap-2 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isHovered ? 0 : 20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
                {/* Link de caso de estudio */}
                <motion.div
                  className="flex items-center gap-2 text-blue-400 font-semibold"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: isHovered ? 0 : -20, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Ver Caso de Estudio
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.a>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
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

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Metodología probada para entregar proyectos excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Línea conectora */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-4 z-0"></div>
                  )}
                  
                  <motion.div 
                    className="relative z-10 text-center lg:text-left"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-32 h-32 mx-auto lg:mx-0 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      <Icon className="w-12 h-12 text-blue-400" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <span className="text-4xl font-bold text-blue-500/50">{step.number}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
                  className="w-full md:w-auto mx-auto block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <Sparkles className="inline w-5 h-5 mr-2" />
                  Enviar Propuesta
                  <ChevronRight className="inline w-5 h-5 ml-2" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;