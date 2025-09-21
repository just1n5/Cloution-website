# 🗺️ Component Map - Cloution Website

## Mapa Visual de Componentes - v1.1.0

```
┌─────────────────────────────────────────────────────────────────────┐
│                            CLOUTION WEBSITE                         │
│                 Landing Page + Portfolio + Case Studies             │
│                     React Router DOM Architecture                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                              App.jsx                                │
│                         [Router Provider]                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         Routes                              │   │
│  │  ┌───────────────┐ ┌──────────────┐ ┌──────────────────┐ │   │
│  │  │  Landing (/)  │ │ Portfolio    │ │ Case Study      │ │   │
│  │  │               │ │ (/portfolio) │ │ (/case/:id)     │ │   │
│  │  └───────────────┘ └──────────────┘ └──────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      ErrorBoundary.jsx                       │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │                    Loader.jsx                        │    │   │
│  │  │  • Animación de carga inicial                       │    │   │
│  │  │  • Logo animado con anillos giratorios            │    │   │
│  │  │  • Transición suave al contenido                  │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  ParticleBackground.jsx                     │   │
│  │  • Canvas con partículas animadas                          │   │
│  │  • Conexiones dinámicas entre puntos                       │   │
│  │  • Orbes flotantes con gradientes                         │   │
│  │  • Efecto parallax con scroll                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 IconsTestSimple.jsx (DEV MODE)              │   │
│  │  • Panel de pruebas para iconos 3D                         │   │
│  │  • Toggle con botón flotante                              │   │
│  │  • Showcase de todos los iconos 3D disponibles           │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════
                        LANDING PAGE COMPONENTS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                            Header.jsx                              │
│  ┌───────────┐  ┌──────────────────┐  ┌────────────────┐        │
│  │   Logo    │  │    Navigation     │  │  CTA Button    │        │
│  │  <Zap/>   │  │  • Inicio         │  │ "Comenzar      │        │
│  │ Cloution  │  │  • Nosotros       │  │   Ahora"       │        │
│  └───────────┘  │  • Servicios      │  └────────────────┘        │
│                 │  • Portfolio  NEW  │                            │
│                 │  • Filosofía      │  ┌────────────────┐        │
│                 │  • Contacto       │  │  Mobile Menu    │        │
│                 └──────────────────┘  │   <Menu/>       │        │
│                                        │  Hamburger      │        │
│                                        └────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                             Hero.jsx                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Badge Component                          │   │
│  │         "Innovación Tecnológica de Vanguardia"             │   │
│  │              Powered by SEVI Philosophy                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Main Title (H1)                          │   │
│  │            "Transformamos tu Futuro Digital"               │   │
│  │         [BreathingValues.jsx Integration]                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Subtitle                               │   │
│  │    "Soluciones tecnológicas B2B que impulsan..."          │   │
│  │         [ValueCompiler.jsx Integration]                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────┐  ┌──────────────────┐                    │   │
│  │  Primary Button  │  │ Secondary Button │                    │   │
│  │ "Descubrir       │  │    "Ver Demo"    │                    │   │
│  │  Servicios"      │  │     <Play/>      │                    │   │
│  └──────────────────┘  └──────────────────┘                    │   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Stats Grid                              │   │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                 │   │
│  │  │ 500+ │  │ 98%  │  │ 24/7 │  │ 50+  │                 │   │
│  │  └──────┘  └──────┘  └──────┘  └──────┘                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Scroll Indicator                              │   │
│  │              "Descubre más" ▼                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           About.jsx                                │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐    │
│  │    Text Content     │  │     3D Illustration              │    │
│  │  • Quiénes Somos    │  │   ┌──────────────────┐          │    │
│  │  • Description      │  │   │  SolarSystem.tsx  │          │    │
│  │  • Key Points Grid  │  │   │ Animated Planets  │          │    │
│  │  • SEVI Integration │  │   │  Orbital Paths    │          │    │
│  └─────────────────────┘  │   └──────────────────┘          │    │
│                           └──────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    Features.jsx (SEVI PILLARS)                     │
│         "Los 4 Pilares de Nuestra Excelencia SEVI"                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│  │ SEGURIDAD  │ │ESCALABILIDAD│ │ VELOCIDAD  │ │ INNOVACIÓN │    │
│  │    Card    │ │    Card     │ │    Card    │ │    Card    │    │
│  │ ┌────────┐ │ │ ┌────────┐  │ │ ┌────────┐ │ │ ┌────────┐ │    │
│  │ │Security│ │ │ │ Cloud  │  │ │ │Frontend│ │ │ │ AI/Data│ │    │
│  │ │Icon 3D │ │ │ │Icon 3D │  │ │ │Icon 3D │ │ │ │Icon 3D │ │    │
│  │ └────────┘ │ │ └────────┘  │ │ └────────┘ │ │ └────────┘ │    │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         Services.jsx                               │
│            "Soluciones que Transforman Negocios"                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Services Grid (2x3)                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │   Pulse     │  │   Lexia     │  │ DataVault   │        │  │
│  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │        │  │
│  │  │ │Backend  │ │  │ │AI/Data  │ │  │ │Cloud    │ │        │  │
│  │  │ │Icon 3D  │ │  │ │Icon 3D  │ │  │ │Icon 3D  │ │        │  │
│  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │ CloudForge  │  │ CodeStream  │  │  Insights   │        │  │
│  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │        │  │
│  │  │ │DevOps   │ │  │ │Frontend │ │  │ │UX/UI    │ │        │  │
│  │  │ │Icon 3D  │ │  │ │Icon 3D  │ │  │ │Icon 3D  │ │        │  │
│  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  │                                                              │  │
│  │  Each card has:                                             │  │
│  │  • 3D Icon with hover animations                           │  │
│  │  • Title & Subtitle                                        │  │
│  │  • Description                                              │  │
│  │  • Expand button (+)                                       │  │
│  │  • Expanded content with features                          │  │
│  │  • Quick stats (time, ROI)                                │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        WebDevPromo.jsx (NEW)                       │
│            "Desarrollo Web de Siguiente Generación"               │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  ┌────────────────────┐    ┌────────────────────┐          │  │
│  │  │   WordPress Pro    │    │    React Expert    │          │  │
│  │  │  ┌──────────────┐  │    │  ┌──────────────┐  │          │  │
│  │  │  │WordPress Logo│  │    │  │ React Logo   │  │          │  │
│  │  │  │     3D       │  │    │  │     3D       │  │          │  │
│  │  │  └──────────────┘  │    │  └──────────────┘  │          │  │
│  │  │                    │    │                    │          │  │
│  │  │ • CMS Robusto     │    │ • SPA Ultrarrápida │          │  │
│  │  │ • E-commerce      │    │ • PWA Ready        │          │  │
│  │  │ • SEO Optimizado  │    │ • Real-time        │          │  │
│  │  └────────────────────┘    └────────────────────┘          │  │
│  │                                                              │  │
│  │         [Animated code transforming into UI]                │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   Philosophy.jsx (SEVI VALUES)                     │
│                   "Valores SEVI que nos Definen"                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Values Grid (2x3)                         │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                   │  │
│  │  │  Pasión  │ │Colaboración│ │Velocidad │                   │  │
│  │  │  <Heart> │ │  <Users>  │ │ <Rocket> │                   │  │
│  │  ├──────────┤ ├──────────┤ ├──────────┤                   │  │
│  │  │Compromiso│ │  Calidad  │ │ Enfoque  │                   │  │
│  │  │ <Award>  │ │  <Star>   │ │ <Target> │                   │  │
│  │  └──────────┘ └──────────┘ └──────────┘                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Mission Statement                           │  │
│  │     "Democratizar el acceso a tecnología SEVI..."           │  │
│  │         "Innovando desde Colombia ❤️"                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         FinalCTA.jsx                               │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                 CTA Card with 3D Effects                     │  │
│  │  🚀 (animated rocket)                                        │  │
│  │  "¿Preparado para Transformar tu Negocio con SEVI?"        │  │
│  │                                                              │  │
│  │  ┌───────────────────┐  ┌──────────────────┐              │  │
│  │  │ Agendar Consultoría│  │ Ver Portfolio    │              │  │
│  │  │      SEVI         │  │   [Link to /portfolio]          │  │
│  │  └───────────────────┘  └──────────────────┘              │  │
│  │                                                              │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                        │  │
│  │  │ISO  │ │Partner│ │Google│ │AWS  │                        │  │
│  │  │27001│ │ MSFT │ │Cloud │ │Adv. │                        │  │
│  │  └─────┘ └─────┘ └─────┘ └─────┘                        │  │
│  │                                                              │  │
│  │  "3 espacios disponibles este mes"                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          Footer.jsx                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Grid Layout (6 cols)                       │  │
│  │  ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │  │
│  │  │ Company  │ │Nosotros│ │Servicios│ │Recursos│           │  │
│  │  │  Info    │ │ Links  │ │  Links  │ │ Links  │           │  │
│  │  │  Logo    │ │• About │ │• Pulse  │ │• Blog  │           │  │
│  │  │ SEVI     │ │• Team  │ │• Lexia  │ │• Docs  │           │  │
│  │  │ Contact  │ │• SEVI  │ │• Cloud  │ │• API   │           │  │
│  │  │  <Mail/> │ └────────┘ └────────┘ └────────┘           │  │
│  │  │ <Phone/> │ ┌────────┐                                   │  │
│  │  │<MapPin/> │ │ Legal  │                                   │  │
│  │  └──────────┘ │ Links  │                                   │  │
│  │                └────────┘                                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Newsletter                                │  │
│  │  [Email Input]              [Suscribirse Button]            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │   © 2024 Cloution SEVI  |   Social Icons   |               │  │
│  │   "Desarrollado con ❤️ en Colombia"                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════
                     PORTFOLIO PAGE COMPONENTS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                     PortfolioPage.jsx (NEW)                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Portfolio Header                          │  │
│  │  "Proyectos que Transforman Negocios"                      │  │
│  │  Filtros: [Todos] [WordPress] [React] [E-commerce]         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Projects Grid (3 cols)                     │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐                       │  │
│  │  │Project │  │Project │  │Project │                       │  │
│  │  │  Card  │  │  Card  │  │  Card  │                       │  │
│  │  │ • Img  │  │ • Img  │  │ • Img  │                       │  │
│  │  │ • Tech │  │ • Tech │  │ • Tech │                       │  │
│  │  │ • Link │  │ • Link │  │ • Link │                       │  │
│  │  └────────┘  └────────┘  └────────┘                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Contact Form Section                        │  │
│  │  "¿Tienes un proyecto en mente?"                           │  │
│  │  [Name] [Email] [Project Type] [Description] [Send]        │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════
                    CASE STUDY PAGE COMPONENTS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                     CaseStudyPage.jsx (NEW)                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     Case Study Hero                          │  │
│  │  [Project Image]                                            │  │
│  │  "Project Name"                                             │  │
│  │  Client | Industry | Date                                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Challenge Section                         │  │
│  │  "El Desafío"                                               │  │
│  │  [Problem description with metrics]                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Solution Section                          │  │
│  │  "Nuestra Solución SEVI"                                   │  │
│  │  [Technical implementation details]                         │  │
│  │  [3D Icons showing technologies used]                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     Results Section                          │  │
│  │  "Resultados Medibles"                                      │  │
│  │  [KPIs and metrics with animated counters]                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

## 📊 Flujo de Interacción del Usuario

```
                    [Usuario entra al sitio]
                            │
                            ▼
                    [Loader Animation]
                            │
                            ▼
                    [React Router]
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   [Landing /]      [Portfolio /portfolio] [Case /:id]
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐        ┌─────────┐        ┌─────────┐
   │  Hero   │        │Projects │        │  Case   │
   │  SEVI   │        │  Grid   │        │ Details │
   └────┬────┘        └────┬────┘        └────┬────┘
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐        ┌─────────┐        ┌─────────┐
   │  About  │        │ Filters │        │Challenge│
   │  3D     │        │  (Tech) │        │         │
   └────┬────┘        └────┬────┘        └────┬────┘
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐        ┌─────────┐        ┌─────────┐
   │Features │        │  Modal  │        │Solution │
   │  SEVI   │        │ Details │        │  SEVI   │
   └────┬────┘        └────┬────┘        └────┬────┘
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐        ┌─────────┐        ┌─────────┐
   │Services │        │ Contact │        │ Results │
   │ Icons3D │        │  Form   │        │  KPIs   │
   └────┬────┘        └─────────┘        └────┬────┘
        │                                       │
        ▼                                       ▼
   ┌─────────┐                          ┌─────────┐
   │WebDev   │                          │  Next   │
   │ Promo   │                          │ Project │
   └────┬────┘                          └─────────┘
        │
        ▼
   ┌─────────┐
   │ Final   │
   │  CTA    │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │ Footer  │
   └─────────┘
```

## 🎯 Puntos de Interacción Principales

### Navegación Principal
- **Sticky Header**: Siempre visible con efecto glass
- **Router Links**: Navegación SPA sin recarga
- **Smooth Scroll**: Para anclas en landing
- **Active State**: Indicador de sección/página actual
- **Mobile Menu**: Menú hamburguesa responsive

### Elementos 3D Interactivos
- **Iconos 3D**: Hover, click, rotación automática
- **Canvas Background**: Partículas reactivas al mouse
- **Solar System**: Órbitas animadas en About
- **WordPress/React Logos**: Animaciones 3D en WebDevPromo

### CTAs (Call-to-Action)
1. **Header CTA**: "Comenzar Ahora"
2. **Hero Primary**: "Descubrir Servicios"
3. **Hero Secondary**: "Ver Demo"
4. **Services CTAs**: "Solicitar Demo de [Servicio]"
5. **WebDev CTA**: "Cotizar Proyecto"
6. **Portfolio CTA**: "Ver Portfolio" (router link)
7. **Final CTA Primary**: "Agendar Consultoría SEVI"
8. **Final CTA Secondary**: "Ver Casos de Éxito"
9. **Footer Newsletter**: "Suscribirse"

### Elementos Expandibles
- **Service Cards**: Click en (+) para expandir
- **Portfolio Projects**: Modal con detalles
- **Mobile Menu**: Toggle hamburguesa
- **Icon Test Panel**: Botón flotante (dev mode)

## 🔄 Estados de los Componentes

### Header
```
Estados:
- transparent (inicial)
- solid (después de scroll > 50px)
- mobile menu open/closed
- active section/route highlight
- hover states en links
```

### Service Cards con Iconos 3D
```
Estados:
- idle (icono rotando lento)
- hovered (icono scale 1.1, glow effect)
- expanded (contenido visible, icono destacado)
- loading (skeleton mientras carga 3D)
```

### Iconos 3D
```
Estados:
- loading (placeholder geometry)
- idle (animación base)
- hover (scale + glow)
- clicked (animación especial)
- error (fallback a icono 2D)
```

### Portfolio Grid
```
Estados:
- all (todos los proyectos)
- filtered (por tecnología)
- loading (skeleton cards)
- hover (elevación + overlay)
- modal open (proyecto seleccionado)
```

### Animaciones Entry (Intersection Observer)
```
Trigger: Elemento entra en viewport
- fadeIn (opacity 0 → 1)
- slideUp (translateY 30px → 0)
- scale (scale 0.9 → 1)
- staggerChildren (delay incremental)
- 3D reveal (rotateX -90deg → 0)
```

## 🎨 Sistema de Colores SEVI

### Colores por Pilar
```
S - Seguridad:    #ef4444 (red-500)    → SecurityIcon3D
E - Escalabilidad: #3b82f6 (blue-500)   → CloudDevOpsIcon3D
V - Velocidad:     #10b981 (green-500)  → FrontendIcon3D
I - Innovación:    #8b5cf6 (purple-500) → AiDataIcon3D
```

### Gradientes SEVI
```css
.sevi-gradient {
  background: linear-gradient(
    135deg,
    #ef4444 0%,    /* S */
    #3b82f6 33%,   /* E */
    #10b981 66%,   /* V */
    #8b5cf6 100%   /* I */
  );
}
```

## 📱 Responsive Breakpoints

### Layouts por Dispositivo
```
Mobile (< 768px):
- Stack vertical
- Iconos 3D simplificados
- Menú hamburguesa
- Grid 1 columna

Tablet (768px - 1024px):
- Grid 2 columnas
- Iconos 3D calidad media
- Navegación híbrida

Desktop (> 1024px):
- Grid 3-4 columnas
- Iconos 3D full quality
- Navegación completa
- Efectos parallax activos
```

## 🚀 Performance Optimizations

### Code Splitting
```javascript
// Páginas lazy loaded
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

// Iconos 3D lazy loaded
const Icon3D = lazy(() => import('./icons/Icon3D'))
```

### 3D Optimizations
- LOD (Level of Detail) por distancia
- Frustum culling automático
- Instancing para partículas
- WebGL context sharing
- Reducción de polígonos en móvil

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0  
**Filosofía**: SEVI - Seguridad, Escalabilidad, Velocidad, Innovación
