// Configuración centralizada del portfolio
export const portfolioProjects = [
  {
    id: 1,
    slug: 'legispro-abogados',
    name: 'LegisPro - Consultorio de Abogados',
    category: ['wordpress', 'corporativo', 'profesional'],
    images: {
      // Rutas actualizadas para las imágenes reales
      desktop: '/portfolio/portfolio_screenshots/Cosnultorio jde abogados Legispro/Legispro_desktop.png',
      mobile: '/portfolio/portfolio_screenshots/Cosnultorio jde abogados Legispro/Legispro_movil.png',
      tablet: '/portfolio/portfolio_screenshots/Cosnultorio jde abogados Legispro/Legispro_tablet.png'
    },
    video: '/portfolio/portfolio_screenshots/Cosnultorio jde abogados Legispro/LegisPro_Video.mp4',
    technologies: ['WordPress', 'Elementor Pro', 'MySQL', 'PHP', 'SEO', 'SSL'],
    description: 'Portal legal profesional con sistema de consultas online y gestión de casos',
    features: [
      'Sistema de citas online',
      'Portal seguro de clientes',
      'Blog jurídico optimizado SEO',
      'Calculadora de honorarios',
      'Chat de consultas en tiempo real',
      'Gestión documental'
    ],
    client: 'LegisPro Consultores',
    year: '2024',
    result: 'Aumento del 150% en consultas online',
    metrics: {
      performance: '98%',
      seo: '100%',
      conversions: '+150%',
      loadTime: '1.2s'
    },
    testimonial: {
      text: 'La transformación digital de nuestro despacho superó todas las expectativas. El sistema de gestión online ha revolucionado nuestra forma de trabajar.',
      author: 'Dr. Juan Martínez',
      position: 'Socio Fundador - LegisPro'
    },
    link: 'https://legispro.com',
    liveUrl: 'https://legispro.com',
    color: '#1e40af'
  },
  {
    id: 2,
    slug: 'aromas-de-origen',
    name: 'Aromas de Origen - Café Premium',
    category: ['wordpress', 'ecommerce', 'premium'],
    images: {
      desktop: '/portfolio/portfolio_screenshots/Marca de cafe premium aromas de origen/Aromas de origen_Desktop.png',
      mobile: '/portfolio/portfolio_screenshots/Marca de cafe premium aromas de origen/Aromas de origen_movil.png',
      tablet: '/portfolio/portfolio_screenshots/Marca de cafe premium aromas de origen/Aromas de origen_tablet.png'
    },
    video: '/portfolio/portfolio_screenshots/Marca de cafe premium aromas de origen/Aromas de origen.mp4',
    technologies: ['WordPress', 'WooCommerce', 'Stripe', 'Custom Theme', 'AJAX', 'PWA'],
    description: 'E-commerce premium de café de especialidad con experiencia inmersiva',
    features: [
      'Tienda online con pagos seguros',
      'Sistema de suscripciones mensuales',
      'Catálogo interactivo 360°',
      'Blog de cultura cafetera',
      'Programa de fidelización',
      'Rastreo de pedidos en tiempo real'
    ],
    client: 'Aromas de Origen S.A.',
    year: '2024',
    result: '200% de incremento en ventas online',
    metrics: {
      performance: '95%',
      seo: '98%',
      conversions: '+200%',
      loadTime: '1.5s'
    },
    testimonial: {
      text: 'La nueva tienda online no solo aumentó nuestras ventas, sino que elevó la percepción de nuestra marca a nivel premium.',
      author: 'María González',
      position: 'CEO - Aromas de Origen'
    },
    link: 'https://aromasdeorigen.com',
    liveUrl: 'https://aromasdeorigen.com',
    color: '#92400e'
  },
  {
    id: 3,
    slug: 'restaurante-el-sabor-de-soacha',
    name: 'El Sabor de Soacha',
    category: ['wordpress', 'corporativo', 'restaurante'],
    images: {
      desktop: '/portfolio/portfolio_screenshots/Restaurante el sabor de soacha/Restaurante el sabor de soacha_desktop.png',
      mobile: '/portfolio/portfolio_screenshots/Restaurante el sabor de soacha/Restaurante el sabor de soacha_movil.png',
      tablet: '/portfolio/portfolio_screenshots/Restaurante el sabor de soacha/Restaurante el sabor de soacha_tablet.png'
    },
    video: '/portfolio/portfolio_screenshots/Restaurante el sabor de soacha/Restaurante el sabor de soacha_video.mp4',
    technologies: ['WordPress', 'Custom Theme', 'OpenTable API', 'Google Maps', 'Schema.org', 'WhatsApp Business'],
    description: 'Sitio web gastronómico con sistema de reservas y menú interactivo',
    features: [
      'Sistema de reservas online',
      'Menú digital interactivo con fotos',
      'Galería de platos 360°',
      'Integración con plataformas de delivery',
      'Eventos y promociones especiales',
      'Reviews y testimonios integrados'
    ],
    client: 'Restaurante El Sabor',
    year: '2024',
    result: '80% más reservas online',
    metrics: {
      performance: '96%',
      seo: '97%',
      conversions: '+80%',
      loadTime: '1.4s'
    },
    testimonial: {
      text: 'El nuevo sitio web transformó completamente la manera en que los clientes interactúan con nuestro restaurante. Las reservas online son ahora nuestra principal fuente de clientes.',
      author: 'Carlos Rodríguez',
      position: 'Propietario - El Sabor de Soacha'
    },
    link: 'https://elsabordesoacha.com',
    liveUrl: 'https://elsabordesoacha.com',
    color: '#dc2626'
  },
  {
    id: 4,
    slug: 'sonrisa-sana-clinica-dental',
    name: 'Sonrisa Sana - Clínica Dental',
    category: ['wordpress', 'corporativo', 'salud'],
    images: {
      desktop: '/portfolio/portfolio_screenshots/Sonrisa sana clinica dental/Sonrisa sana Clinica dental_desktop.png',
      mobile: '/portfolio/portfolio_screenshots/Sonrisa sana clinica dental/Sonrisa sana_movil.png',
      tablet: '/portfolio/portfolio_screenshots/Sonrisa sana clinica dental/Sonrisa sana_tablet.png'
    },
    video: null,
    technologies: ['WordPress', 'Elementor', 'Calendar API', 'WhatsApp Business', 'SSL', 'HIPAA Compliant'],
    description: 'Portal médico moderno con sistema de citas y telemedicina',
    features: [
      'Agenda de citas online 24/7',
      'Portal seguro de pacientes',
      'Chat de consultas médicas',
      'Portal de resultados de exámenes',
      'Recordatorios automáticos',
      'Historial clínico digital'
    ],
    client: 'Clínica Sonrisa Sana',
    year: '2024',
    result: '120% más citas agendadas',
    metrics: {
      performance: '97%',
      seo: '99%',
      conversions: '+120%',
      loadTime: '1.1s'
    },
    testimonial: {
      text: 'El sistema de citas online ha revolucionado nuestra clínica. Los pacientes adoran la facilidad de agendar y gestionar sus citas desde cualquier dispositivo.',
      author: 'Dra. Ana Martín',
      position: 'Directora - Clínica Sonrisa Sana'
    },
    link: 'https://sonrisasana.com',
    liveUrl: 'https://sonrisasana.com',
    color: '#059669'
  }
];

// Categorías disponibles
export const portfolioCategories = [
  { id: 'todos', label: 'Todos', count: portfolioProjects.length },
  { id: 'wordpress', label: 'WordPress', count: portfolioProjects.filter(p => p.category.includes('wordpress')).length },
  { id: 'ecommerce', label: 'E-commerce', count: portfolioProjects.filter(p => p.category.includes('ecommerce')).length },
  { id: 'corporativo', label: 'Corporativo', count: portfolioProjects.filter(p => p.category.includes('corporativo')).length },
  { id: 'profesional', label: 'Profesional', count: portfolioProjects.filter(p => p.category.includes('profesional')).length },
  { id: 'salud', label: 'Salud', count: portfolioProjects.filter(p => p.category.includes('salud')).length },
  { id: 'restaurante', label: 'Restaurante', count: portfolioProjects.filter(p => p.category.includes('restaurante')).length },
  { id: 'premium', label: 'Premium', count: portfolioProjects.filter(p => p.category.includes('premium')).length }
];

// Proceso de trabajo
export const workProcess = [
  {
    number: '01',
    title: 'Estrategia y UX',
    description: 'Análisis profundo de objetivos y usuarios target',
    details: [
      'Research de mercado',
      'Análisis de competencia',
      'User personas',
      'Customer journey'
    ],
    icon: '🎯'
  },
  {
    number: '02',
    title: 'Diseño UI y Prototipado',
    description: 'Creación de interfaces atractivas y funcionales',
    details: [
      'Wireframes detallados',
      'Diseño visual',
      'Prototipo interactivo',
      'Testing con usuarios'
    ],
    icon: '🎨'
  },
  {
    number: '03',
    title: 'Desarrollo y QA',
    description: 'Programación con las mejores prácticas',
    details: [
      'Código limpio y optimizado',
      'Testing exhaustivo',
      'Optimización SEO',
      'Performance tuning'
    ],
    icon: '💻'
  },
  {
    number: '04',
    title: 'Despliegue y Soporte',
    description: 'Lanzamiento exitoso y mantenimiento continuo',
    details: [
      'Deploy seguro',
      'Monitoreo 24/7',
      'Actualizaciones regulares',
      'Soporte técnico dedicado'
    ],
    icon: '🚀'
  }
];

// Estadísticas generales
export const portfolioStats = {
  totalProjects: portfolioProjects.length,
  satisfactionRate: '100%',
  averageIncrease: '137%',
  clientsServed: '50+',
  yearsExperience: '5+'
};

// Tecnologías que usamos
export const technologies = {
  frontend: ['React', 'Vue', 'Angular', 'Next.js', 'WordPress', 'Elementor'],
  backend: ['Node.js', 'PHP', 'Python', 'MySQL', 'MongoDB', 'PostgreSQL'],
  ecommerce: ['WooCommerce', 'Shopify', 'Stripe', 'PayPal', 'MercadoPago'],
  tools: ['Git', 'Docker', 'AWS', 'Google Cloud', 'Vercel', 'Netlify']
};

