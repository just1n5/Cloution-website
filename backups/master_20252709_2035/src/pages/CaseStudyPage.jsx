import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Pause,
  TrendingUp,
  Users,
  Clock,
  Target,
  Award,
  Zap,
  Globe,
  Code2,
  Database,
  Palette,
  Server
} from 'lucide-react';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  
  // Datos del caso de estudio (en producción vendría de una API o CMS)
  const caseStudy = {
    slug: 'clinica-dental-sonrie',
    projectName: 'Clínica Dental Sonríe',
    clientName: 'Dr. Roberto Martínez',
    liveUrl: 'https://clinicadentalsonrie.com',
    heroImage: '/api/placeholder/1920/1080',
    videoUrl: '/api/placeholder/video',
    challenge: 'La Clínica Dental Sonríe necesitaba modernizar su presencia digital para competir en un mercado saturado. Su sitio web anterior era estático, no responsive, y carecía de funcionalidades esenciales como reserva de citas online. Los pacientes tenían dificultades para encontrar información sobre servicios y el personal administrativo perdía horas diarias gestionando citas por teléfono.',
    solution: 'Desarrollamos una plataforma integral en WordPress con un sistema de reservas automatizado, integración con calendarios del personal médico, y una sección de pacientes con historiales digitalizados. Implementamos un diseño moderno y accesible que refleja el profesionalismo de la clínica, con optimización SEO local que mejoró su visibilidad en búsquedas de "dentista cerca de mí". El nuevo sistema redujo la carga administrativa en un 40% y aumentó las conversiones online en un 200%.',
    results: [
      { metric: '+200%', description: 'en citas agendadas online' },
      { metric: '-40%', description: 'reducción en carga administrativa' },
      { metric: '3.5s', description: 'tiempo de carga optimizado' },
      { metric: '98/100', description: 'puntuación en PageSpeed' },
      { metric: '+150%', description: 'aumento en tráfico orgánico' },
      { metric: '5★', description: 'satisfacción del cliente' }
    ],
    technologies: [
      { name: 'WordPress', icon: Globe, category: 'CMS' },
      { name: 'Elementor Pro', icon: Palette, category: 'Builder' },
      { name: 'MySQL', icon: Database, category: 'Database' },
      { name: 'PHP', icon: Code2, category: 'Backend' },
      { name: 'Cloudflare', icon: Server, category: 'CDN' },
      { name: 'Figma', icon: Palette, category: 'Design' }
    ],
    features: [
      'Sistema de reservas online integrado',
      'Portal de pacientes con historiales',
      'Chat en vivo con WhatsApp Business',
      'Blog de salud dental optimizado para SEO',
      'Galería de casos antes/después',
      'Calculadora de presupuestos automática',
      'Integración con Google My Business',
      'Sistema de recordatorios por SMS/Email'
    ],
    testimonial: {
      text: "Cloution transformó completamente nuestra presencia digital. No solo tenemos un sitio web hermoso, sino una herramienta de negocio que trabaja 24/7 para nosotros.",
      author: "Dr. Roberto Martínez",
      role: "Director, Clínica Dental Sonríe"
    },
    gallery: [
      { type: 'desktop', image: '/api/placeholder/1440/900', alt: 'Vista desktop' },
      { type: 'tablet', image: '/api/placeholder/768/1024', alt: 'Vista tablet' },
      { type: 'mobile', image: '/api/placeholder/375/812', alt: 'Vista móvil' }
    ],
    beforeAfter: {
      before: '/api/placeholder/800/600',
      after: '/api/placeholder/800/600'
    },
    nextProject: { 
      slug: 'tienda-eco-verde', 
      name: 'EcoVerde Store' 
    },
    prevProject: { 
      slug: 'restaurante-gourmet', 
      name: 'Restaurante Gourmet' 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  // Device mockup component
  const DeviceMockup = ({ type, image, alt }) => {
    const mockupStyles = {
      desktop: {
        frame: 'w-full max-w-4xl mx-auto',
        screen: 'aspect-[16/10]',
        bezel: 'p-3 bg-gray-800 rounded-t-lg'
      },
      tablet: {
        frame: 'w-full max-w-md mx-auto',
        screen: 'aspect-[3/4]',
        bezel: 'p-8 bg-gray-800 rounded-3xl'
      },
      mobile: {
        frame: 'w-full max-w-xs mx-auto',
        screen: 'aspect-[9/19]',
        bezel: 'p-4 bg-gray-900 rounded-[2.5rem]'
      }
    };

    const style = mockupStyles[type];

    return (
      <motion.div
        className={style.frame}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className={style.bezel}>
          {type === 'desktop' && (
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          )}
          <div className={`${style.screen} overflow-hidden rounded-lg bg-gray-100`}>
            <img src={image} alt={alt} className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={caseStudy.heroImage} 
            alt={caseStudy.projectName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 mb-6"
            >
              <Award className="w-4 h-4" />
              Caso de Éxito
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              {caseStudy.projectName}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8"
            >
              {caseStudy.clientName}
            </motion.p>

            <motion.a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              Visitar Sitio Web en Vivo
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* El Reto */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">El Reto</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </motion.div>

              {/* La Solución */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">La Solución</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Galería de Impacto
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Diseño responsive que se adapta perfectamente a cualquier dispositivo
            </p>
          </motion.div>

          {/* Device Mockups */}
          <div className="space-y-16">
            {/* Desktop View */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Monitor className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300 font-medium">Vista Desktop</span>
              </div>
              <DeviceMockup type="desktop" image={caseStudy.gallery[0].image} alt={caseStudy.gallery[0].alt} />
            </div>

            {/* Tablet and Mobile Views */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Tablet className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300 font-medium">Vista Tablet</span>
                </div>
                <DeviceMockup type="tablet" image={caseStudy.gallery[1].image} alt={caseStudy.gallery[1].alt} />
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Smartphone className="w-6 h-6 text-teal-400" />
                  <span className="text-gray-300 font-medium">Vista Móvil</span>
                </div>
                <DeviceMockup type="mobile" image={caseStudy.gallery[2].image} alt={caseStudy.gallery[2].alt} />
              </div>
            </div>

            {/* Before & After Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Antes y Después
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
                    Antes
                  </div>
                  <img 
                    src={caseStudy.beforeAfter.before} 
                    alt="Antes del rediseño"
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                    Después
                  </div>
                  <img 
                    src={caseStudy.beforeAfter.after} 
                    alt="Después del rediseño"
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-8 text-center">
                Resultados Obtenidos
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {result.metric}
                    </div>
                    <div className="text-gray-300">
                      {result.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Características Implementadas
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {caseStudy.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Tecnologías Utilizadas
              </h3>
              <div className="flex flex-wrap gap-4">
                {caseStudy.technologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg"
                      whileHover={{ scale: 1.05, borderColor: 'rgb(59 130 246 / 0.5)' }}
                    >
                      <Icon className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">{tech.name}</span>
                      <span className="text-gray-500 text-sm">({tech.category})</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="text-6xl mb-6">💬</div>
            <blockquote className="text-2xl text-white italic mb-6">
              "{caseStudy.testimonial.text}"
            </blockquote>
            <div className="space-y-1">
              <div className="text-blue-400 font-semibold">
                {caseStudy.testimonial.author}
              </div>
              <div className="text-gray-400">
                {caseStudy.testimonial.role}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            {caseStudy.prevProject ? (
              <Link
                to={`/portafolio/${caseStudy.prevProject.slug}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">Proyecto Anterior</div>
                  <div className="font-semibold">{caseStudy.prevProject.name}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {caseStudy.nextProject ? (
              <Link
                to={`/portafolio/${caseStudy.nextProject.slug}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Proyecto Siguiente</div>
                  <div className="font-semibold">{caseStudy.nextProject.name}</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyPage;