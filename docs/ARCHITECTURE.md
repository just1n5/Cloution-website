# 🏗️ Arquitectura y Estructura - Cloution Website

## 📋 Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Arquitectura de Componentes](#arquitectura-de-componentes)
5. [Sistema de Iconos 3D](#sistema-de-iconos-3d)
6. [Sistema de Rutas](#sistema-de-rutas)
7. [Flujo de Datos](#flujo-de-datos)
8. [Gestión de Estado](#gestión-de-estado)
9. [Patrones de Diseño](#patrones-de-diseño)
10. [Optimizaciones](#optimizaciones)
11. [Build y Deployment](#build-y-deployment)

---

## 🎯 Visión General

### Tipo de Aplicación
**Landing Page SPA con Capacidades 3D**
- Single Page Application con React Router
- Renderizado del lado del cliente (CSR)
- Gráficos 3D interactivos con Three.js
- Navegación suave sin recarga de página
- Optimizada para SEO con meta tags
- Progressive Enhancement

### Filosofía SEVI
**SEVI** es el acrónimo que define los 4 pilares fundamentales de Cloution:
- **S** - **Seguridad**: Protección sin compromisos
- **E** - **Escalabilidad**: Crecimiento sin límites  
- **V** - **Velocidad**: Rendimiento instantáneo
- **I** - **Innovación**: El futuro, hoy

Esta filosofía está integrada en toda la arquitectura y diseño del sitio web.

### Arquitectura General
```
┌─────────────────────────────────────────────┐
│                   Usuario                   │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│            Navegador (Client)               │
│  ┌────────────────────────────────────┐    │
│  │      React Application + Router    │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │    Componentes React         │  │    │
│  │  │  ┌──────────┐ ┌──────────┐  │  │    │
│  │  │  │  Header  │ │   Hero   │  │  │    │
│  │  │  ├──────────┤ ├──────────┤  │  │    │
│  │  │  │  About   │ │ Services │  │  │    │
│  │  │  ├──────────┤ ├──────────┤  │  │    │
│  │  │  │ Features │ │Philosophy│  │  │    │
│  │  │  ├──────────┤ ├──────────┤  │  │    │
│  │  │  │WebDevPromo│ │   CTA   │  │  │    │
│  │  │  └──────────┘ └──────────┘  │  │    │
│  │  └──────────────────────────────┘  │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │      Three.js / R3F          │  │    │
│  │  │    (Iconos 3D Interactivos)  │  │    │
│  │  └──────────────────────────────┘  │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │     Framer Motion API        │  │    │
│  │  └──────────────────────────────┘  │    │
│  │  ┌──────────────────────────────┐  │    │
│  │  │     Tailwind CSS Classes     │  │    │
│  │  └──────────────────────────────┘  │    │
│  └────────────────────────────────────┘    │
│  ┌────────────────────────────────────┐    │
│  │          Vite Dev Server           │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Core Technologies

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | Framework UI principal |
| **Vite** | 5.3.4 | Build tool y dev server |
| **React Router DOM** | 6.20.0 | Sistema de routing SPA |
| **Tailwind CSS** | 3.4.0 | Sistema de estilos utility-first |
| **Framer Motion** | 11.0.0 | Animaciones y transiciones |
| **Three.js** | 0.158.0 | Motor de renderizado 3D |
| **@react-three/fiber** | 8.18.0 | React renderer para Three.js |
| **@react-three/drei** | 9.122.0 | Utilidades para R3F |
| **Lucide React** | 0.263.1 | Librería de iconos |
| **React Intersection Observer** | 9.5.3 | Detección de viewport |

### Dependencias de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **ESLint** | Linting de código |
| **PostCSS** | Procesamiento de CSS |
| **Autoprefixer** | Compatibilidad cross-browser |
| **@vitejs/plugin-react** | Integración React-Vite |
| **@types/react** | TypeScript definitions |

### Herramientas de Desarrollo

| Herramienta | Uso |
|-------------|-----|
| **Node.js 18+** | Runtime de JavaScript |
| **npm 9+** | Gestor de paquetes |
| **Git** | Control de versiones |
| **VS Code** | Editor recomendado |

---

## 📁 Estructura de Carpetas

```
Cloution_Website/
│
├── 📁 .vscode/                    # Configuración del editor
│   ├── extensions.json           # Extensiones recomendadas
│   └── settings.json            # Configuración del workspace
│
├── 📁 docs/                      # Documentación del proyecto
│   ├── ARCHITECTURE.md          # Este archivo
│   ├── COMPONENT_MAP.md         # Mapa de componentes
│   ├── DESIGN_SYSTEM.md         # Sistema de diseño
│   ├── DEPLOYMENT.md            # Guía de despliegue
│   ├── COMMANDS.md              # Comandos útiles
│   ├── SEVI_PHILOSOPHY.md       # Filosofía SEVI
│   ├── SEVI_IMPLEMENTATION.md   # Implementación SEVI
│   ├── 3D_ICONS_SYSTEM.md       # Sistema de iconos 3D
│   └── EXECUTIVE_SUMMARY.md     # Resumen ejecutivo
│
├── 📁 node_modules/              # Dependencias (ignorado en git)
│
├── 📁 public/                    # Assets estáticos
│   ├── logo.svg                 # Logo de la aplicación
│   ├── robots.txt               # Configuración para crawlers
│   └── test.html                # Página de prueba
│
├── 📁 src/                       # Código fuente principal
│   ├── 📁 components/           # Componentes React
│   │   ├── Header.jsx          # Navegación principal
│   │   ├── Hero.jsx            # Sección hero/banner
│   │   ├── About.jsx           # Sección sobre nosotros
│   │   ├── Features.jsx        # Características SEVI
│   │   ├── Services.jsx        # Servicios ofrecidos
│   │   ├── WebDevPromo.jsx     # Promoción desarrollo web
│   │   ├── Philosophy.jsx      # Filosofía SEVI
│   │   ├── FinalCTA.jsx        # Call-to-action final
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── ParticleBackground.jsx # Fondo animado
│   │   ├── Loader.jsx          # Pantalla de carga
│   │   ├── ErrorBoundary.jsx   # Manejo de errores
│   │   ├── IconsTestSimple.jsx # Prueba de iconos 3D
│   │   ├── AllIconsTest.jsx    # Test completo de iconos
│   │   └── 📁 hero-sections/   # Variantes del Hero
│   │       ├── BreathingValues.jsx # Valores animados
│   │       └── ValueCompiler.jsx   # Compilador de valores
│   │
│   ├── 📁 icons/                # Sistema de iconos 3D
│   │   ├── FrontendIcon3D.jsx  # Icono 3D Frontend
│   │   ├── BackendIcon3D.jsx   # Icono 3D Backend
│   │   ├── CloudDevOpsIcon3D.jsx # Icono 3D Cloud/DevOps
│   │   ├── SecurityIcon3D.jsx  # Icono 3D Seguridad
│   │   ├── AiDataIcon3D.jsx    # Icono 3D IA/Data
│   │   ├── UxUiIcon3D.jsx      # Icono 3D UX/UI
│   │   ├── ApisAutomationIcon3D.jsx # Icono 3D APIs
│   │   ├── WordPressLogo.jsx   # Logo WordPress 3D
│   │   ├── ReactLogo.jsx       # Logo React 3D
│   │   ├── SolarSystem.tsx     # Sistema solar animado
│   │   ├── index.js            # Exports centralizados
│   │   └── README.md           # Documentación de iconos
│   │
│   ├── 📁 pages/                # Páginas de la aplicación
│   │   ├── PortfolioPage.jsx   # Página de portafolio
│   │   └── CaseStudyPage.jsx   # Página de casos de estudio
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   └── useScrollAndWindow.js # Hooks de scroll y ventana
│   │
│   ├── App.jsx                  # Componente raíz con router
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── 📁 utils/                     # Utilidades y helpers
│
├── 📄 .env.example               # Variables de entorno ejemplo
├── 📄 .eslintrc.cjs             # Configuración ESLint
├── 📄 .gitignore                # Archivos ignorados por Git
├── 📄 index.html                # HTML principal
├── 📄 package.json              # Dependencias y scripts
├── 📄 package-lock.json         # Lock file de npm
├── 📄 postcss.config.js         # Configuración PostCSS
├── 📄 tailwind.config.js        # Configuración Tailwind
├── 📄 vite.config.js            # Configuración Vite
│
├── 📄 README.md                 # Documentación principal
└── 📄 [Scripts .bat/.sh/.ps1]   # Scripts de utilidad
```

### Archivos de Utilidad (Scripts)
```
├── 🔧 RUN.bat                   # Inicio rápido del proyecto
├── 🔧 start.bat                 # Script de inicio alternativo
├── 🔧 TEST_HERO_V2.bat          # Test del componente Hero v2
├── 🔧 TEST_LOGO.bat             # Test de logos animados
├── 🔧 TEST_SEVI.bat             # Test del sistema SEVI
├── 🔧 VERIFY_ALL_LOGOS.bat      # Verificación de todos los logos
├── 🔧 install.ps1               # Script PowerShell de instalación
└── 🔧 install.sh                # Script Unix de instalación
```

---

## 🧩 Arquitectura de Componentes

### Jerarquía de Componentes

```
App.jsx
├── React Router Provider
│   ├── Routes
│   │   ├── Landing Page Route (/)
│   │   ├── Portfolio Route (/portfolio)
│   │   └── Case Study Route (/case-study/:id)
├── ErrorBoundary
│   └── [Contenido de la App]
├── Loader (condicional)
├── ParticleBackground
├── IconsTest (modo desarrollo)
└── Main Layout
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   └── MobileMenu
    ├── Hero
    │   ├── Badge
    │   ├── Title
    │   ├── Subtitle
    │   ├── CTAButtons
    │   ├── Stats
    │   └── ScrollIndicator
    ├── About
    │   ├── Content
    │   └── IsometricIllustration
    ├── Features (SEVI)
    │   └── FeatureCard (x4)
    │       └── Icon3D Component
    ├── Services
    │   └── ServiceCard (x6)
    │       ├── Icon3D Component
    │       └── ExpandedContent
    ├── WebDevPromo
    │   ├── WordPressSection
    │   │   └── WordPressLogo 3D
    │   └── ReactSection
    │       └── ReactLogo 3D
    ├── Philosophy (SEVI)
    │   ├── Values (x6)
    │   └── MissionStatement
    ├── FinalCTA
    │   ├── Title
    │   ├── CTAButtons
    │   └── TrustBadges
    └── Footer
        ├── CompanyInfo
        ├── Links
        ├── Newsletter
        └── SocialLinks
```

### Tipos de Componentes

#### 1. **Componentes de Layout**
- `App.jsx`: Componente raíz con React Router
- `Header.jsx`: Navegación fija con efectos dinámicos
- `Footer.jsx`: Información de contacto y enlaces

#### 2. **Componentes de Sección**
- `Hero.jsx`: Banner principal con animaciones
- `About.jsx`: Información sobre la empresa
- `Features.jsx`: Características SEVI destacadas
- `Services.jsx`: Catálogo de servicios con iconos 3D
- `WebDevPromo.jsx`: Promoción de servicios web
- `Philosophy.jsx`: Valores SEVI y misión
- `FinalCTA.jsx`: Llamada a la acción final

#### 3. **Componentes 3D**
- `FrontendIcon3D.jsx`: Icono 3D para frontend
- `BackendIcon3D.jsx`: Icono 3D para backend
- `CloudDevOpsIcon3D.jsx`: Icono 3D para cloud/DevOps
- `SecurityIcon3D.jsx`: Icono 3D para seguridad
- `AiDataIcon3D.jsx`: Icono 3D para IA/Data
- `UxUiIcon3D.jsx`: Icono 3D para UX/UI
- `ApisAutomationIcon3D.jsx`: Icono 3D para APIs

#### 4. **Componentes de Utilidad**
- `ParticleBackground.jsx`: Canvas animado de fondo
- `Loader.jsx`: Indicador de carga inicial
- `ErrorBoundary.jsx`: Captura y manejo de errores

#### 5. **Páginas**
- `PortfolioPage.jsx`: Galería de proyectos
- `CaseStudyPage.jsx`: Casos de estudio detallados

---

## 🎨 Sistema de Iconos 3D

### Arquitectura 3D
El sistema de iconos 3D utiliza Three.js con React Three Fiber para crear experiencias visuales interactivas:

```javascript
// Estructura básica de un icono 3D
const Icon3D = ({ size = 1, color = '#2563eb', animate = true }) => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (animate) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Canvas>
  )
}
```

### Características del Sistema 3D
- **Renderizado optimizado** con React Three Fiber
- **Animaciones fluidas** con useFrame
- **Interactividad** con eventos de mouse
- **Lazy loading** para performance
- **Responsive** adaptado a todos los tamaños

### Integración con Componentes
```jsx
// En Services.jsx
import CloudDevOpsIcon3D from '@/icons/CloudDevOpsIcon3D'

<div className="icon-container">
  <CloudDevOpsIcon3D size={1.5} animate={true} />
</div>
```

---

## 🛣️ Sistema de Rutas

### Configuración de React Router
```javascript
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PortfolioPage from './pages/PortfolioPage'
import CaseStudyPage from './pages/CaseStudyPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
      </Routes>
    </Router>
  )
}
```

### Rutas Disponibles

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | LandingPage | Página principal |
| `/portfolio` | PortfolioPage | Galería de proyectos |
| `/case-study/:id` | CaseStudyPage | Caso de estudio específico |
| `#nosotros` | About (ancla) | Sección sobre nosotros |
| `#servicios` | Services (ancla) | Sección de servicios |
| `#filosofia` | Philosophy (ancla) | Filosofía SEVI |
| `#contacto` | Footer (ancla) | Información de contacto |

### Navegación por Anclas
```javascript
// Navegación suave a secciones
const handleNavClick = (e, href) => {
  e.preventDefault()
  const element = document.getElementById(targetId)
  element.scrollIntoView({ behavior: 'smooth' })
}
```

---

## 🔄 Flujo de Datos

### Estado Local
Cada componente maneja su propio estado local usando `useState`:

```javascript
// Ejemplo en Services.jsx
const [expandedCard, setExpandedCard] = useState(null)
const [hoveredService, setHoveredService] = useState(null)
```

### Props Flow
Los componentes son principalmente autosuficientes con props mínimas:
- Iconos 3D reciben: `size`, `color`, `animate`
- Cards reciben: `data`, `expanded`, `onExpand`
- No hay prop drilling significativo
- No hay estado global compartido (por ahora)

### Event Handling
```javascript
// Interacciones con iconos 3D
<Icon3D
  onClick={() => handleServiceSelect(service)}
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
/>
```

---

## 📊 Gestión de Estado

### Estrategia de Estado
1. **Estado Local**: Para UI y interacciones simples
2. **Props**: Para configuración estática
3. **Hooks Personalizados**: Para lógica reutilizable
4. **URL State**: Para rutas con React Router

### Custom Hooks

#### useScrollPosition
```javascript
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
      // Detectar dirección
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return { scrollPosition, scrollDirection }
}
```

#### useWindowSize
```javascript
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return windowSize
}
```

---

## 🎨 Patrones de Diseño

### 1. **Component Composition**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <Component />
</motion.div>
```

### 2. **Render Props Pattern** (con React Three Fiber)
```jsx
<Canvas>
  {(state) => <Icon3D state={state} />}
</Canvas>
```

### 3. **Container/Presentational Pattern**
- Containers: Manejan lógica y estado
- Presentational: Solo reciben props y renderizan UI

### 4. **Error Boundary Pattern**
```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 5. **Lazy Loading Pattern**
```jsx
const Icon3D = lazy(() => import('./icons/Icon3D'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
```

### 6. **Suspense Pattern** (para componentes 3D)
```jsx
<Suspense fallback={<LoadingSpinner />}>
  <Canvas>
    <Icon3D />
  </Canvas>
</Suspense>
```

---

## ⚡ Optimizaciones

### Performance

#### 1. **Code Splitting**
```javascript
// Vite automáticamente divide el código
// Lazy loading manual para páginas
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
```

#### 2. **3D Optimization**
```javascript
// Reducir polígonos en móviles
const isMobile = window.innerWidth < 768
const detail = isMobile ? 16 : 32

<sphereGeometry args={[1, detail, detail]} />
```

#### 3. **Asset Optimization**
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    }
  }
}
```

#### 4. **CSS Optimization**
- Tailwind CSS purga clases no utilizadas
- PostCSS minimiza el CSS final
- Critical CSS inline en el HTML

#### 5. **3D Performance**
- LOD (Level of Detail) para modelos
- Instancing para objetos repetidos
- Frustum culling automático
- Reducir sombras en móviles

### SEO

#### Meta Tags
```html
<meta name="description" content="Cloution - Consultora tecnológica B2B con filosofía SEVI">
<meta name="keywords" content="SaaS, desarrollo, software, B2B, SEVI">
```

#### Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cloution",
  "url": "https://cloution.com",
  "philosophy": "SEVI"
}
</script>
```

### Accesibilidad
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Fallbacks para contenido 3D

---

## 🏗️ Build y Deployment

### Scripts de NPM

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite --host --open` | Servidor de desarrollo |
| `build` | `vite build` | Build de producción |
| `preview` | `vite preview` | Preview del build |
| `lint` | `eslint .` | Linting del código |
| `clean` | `rimraf node_modules dist` | Limpiar proyecto |
| `reinstall` | `npm run clean && npm install` | Reinstalar deps |
| `fix` | `npm cache clean --force && npm install --force` | Reparar deps |

### Proceso de Build

```bash
# 1. Instalación de dependencias
npm install

# 2. Build de producción
npm run build

# 3. Preview local
npm run preview
```

### Estructura del Build
```
dist/
├── assets/
│   ├── index-[hash].js      # JavaScript principal
│   ├── index-[hash].css     # CSS principal
│   ├── vendor-[hash].js     # Librerías React
│   ├── three-[hash].js      # Librerías Three.js
│   └── animations-[hash].js # Framer Motion
├── index.html               # HTML optimizado
└── logo.svg                 # Assets estáticos
```

### Configuración de Producción

#### Vite Config
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion'],
        }
      }
    }
  }
})
```

#### Variables de Entorno
```bash
# .env.production
VITE_API_URL=https://api.cloution.com
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_ENABLE_3D=true
```

---

## 🔒 Seguridad

### Headers de Seguridad
```nginx
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### Mejores Prácticas
1. No exponer API keys en el frontend
2. Validación de inputs del usuario
3. Sanitización de contenido dinámico
4. HTTPS obligatorio en producción
5. Rate limiting en formularios
6. Validación de modelos 3D externos

---

## 📈 Monitoreo y Analytics

### Herramientas Recomendadas
- **Google Analytics**: Métricas de usuario
- **Sentry**: Tracking de errores
- **Lighthouse**: Auditoría de performance
- **Web Vitals**: Métricas de UX
- **Three.js Inspector**: Debug de escenas 3D

### Métricas Clave
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms
- **FPS** (Frames Per Second): > 30fps en 3D

---

## 🔄 CI/CD Pipeline

### Workflow Sugerido
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: # Deploy to hosting
```

---

## 🚀 Roadmap Futuro

### Fase 1 (Actual) ✅
- Landing page con SEVI
- Sistema de iconos 3D
- Routing básico
- Responsive design

### Fase 2 (Q1 2025)
- [ ] Integración con CMS
- [ ] Formulario de contacto funcional
- [ ] Blog section
- [ ] Multi-idioma (i18n)
- [ ] Más iconos 3D

### Fase 3 (Q2 2025)
- [ ] Dashboard de cliente
- [ ] Chat en vivo
- [ ] PWA features
- [ ] Dark/Light mode
- [ ] Editor de iconos 3D

### Fase 4 (Q3 2025)
- [ ] Portal de clientes
- [ ] Sistema de tickets
- [ ] Integración con APIs
- [ ] Analytics dashboard
- [ ] WebGL 2.0 features

---

## 📚 Referencias y Recursos

### Documentación Oficial
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [React Router](https://reactrouter.com)

### Herramientas de Desarrollo
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Three.js Editor](https://threejs.org/editor/)
- [Spline](https://spline.design/) - Diseño 3D
- [Vite Plugin Inspector](https://github.com/antfu/vite-plugin-inspect)

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0  
**Mantenido por**: Equipo de Desarrollo Cloution
