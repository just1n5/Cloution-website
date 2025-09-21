# 🛣️ Guía de Routing - Cloution Website

## 📋 Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Configuración de React Router](#configuración-de-react-router)
3. [Rutas Disponibles](#rutas-disponibles)
4. [Navegación](#navegación)
5. [Lazy Loading](#lazy-loading)
6. [Parámetros y Query Strings](#parámetros-y-query-strings)
7. [Manejo de Errores](#manejo-de-errores)
8. [SEO y Metadata](#seo-y-metadata)
9. [Deployment Considerations](#deployment-considerations)

---

## 🎯 Visión General

El sistema de routing de Cloution Website está basado en **React Router DOM v6**, proporcionando navegación del lado del cliente (Client-Side Routing) para una experiencia de usuario fluida tipo SPA (Single Page Application).

### Características Principales
- ✨ **Navegación instantánea** sin recarga de página
- 📱 **URLs amigables** y compartibles
- 🔄 **Historial del navegador** funcional
- ⚡ **Code splitting** por ruta
- 🎯 **Parámetros dinámicos** en rutas

---

## ⚙️ Configuración de React Router

### Instalación
```bash
npm install react-router-dom
```

### Setup Básico en App.jsx
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader'

// Lazy loading de páginas
const LandingPage = lazy(() => import('./pages/LandingPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
```

---

## 🗺️ Rutas Disponibles

### Rutas Principales

| Ruta | Componente | Descripción | Acceso |
|------|------------|-------------|--------|
| `/` | `LandingPage` | Página principal con todas las secciones | Público |
| `/portfolio` | `PortfolioPage` | Galería de proyectos realizados | Público |
| `/case-study/:id` | `CaseStudyPage` | Detalle de caso de estudio | Público |

### Anclas de Navegación (Landing Page)

| Ancla | Sección | Navegación |
|-------|---------|------------|
| `#inicio` | Hero | Scroll suave |
| `#nosotros` | About | Scroll suave |
| `#servicios` | Services | Scroll suave |
| `#desarrollo-web` | WebDevPromo | Scroll suave |
| `#filosofia` | Philosophy | Scroll suave |
| `#contacto` | Footer | Scroll suave |

### Rutas de Error

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `*` | `NotFound` | Página 404 para rutas no encontradas |

---

## 🧭 Navegación

### Componente Link
```jsx
import { Link } from 'react-router-dom'

// Navegación interna
<Link to="/portfolio" className="nav-link">
  Ver Portfolio
</Link>

// Con estado
<Link 
  to="/case-study/proyecto-1" 
  state={{ from: 'portfolio' }}
>
  Ver Caso de Estudio
</Link>
```

### Navegación Programática
```jsx
import { useNavigate } from 'react-router-dom'

function ServiceCard() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    // Navegación simple
    navigate('/portfolio')
    
    // Con replace (no agrega al historial)
    navigate('/portfolio', { replace: true })
    
    // Con estado
    navigate('/case-study/1', { 
      state: { service: 'web-development' } 
    })
    
    // Navegar atrás
    navigate(-1)
  }
}
```

### NavLink para Estilos Activos
```jsx
import { NavLink } from 'react-router-dom'

<NavLink 
  to="/portfolio"
  className={({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  Portfolio
</NavLink>
```

### Navegación con Scroll a Ancla
```jsx
import { useNavigate, useLocation } from 'react-router-dom'

function NavigateToSection() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      // Si no estamos en home, navegar primero
      navigate('/')
      // Esperar a que cargue y luego hacer scroll
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        })
      }, 100)
    } else {
      // Si estamos en home, solo hacer scroll
      document.getElementById(sectionId)?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }
  }
  
  return (
    <button onClick={() => handleNavClick('servicios')}>
      Ver Servicios
    </button>
  )
}
```

---

## ⚡ Lazy Loading

### Configuración de Lazy Loading
```jsx
import { lazy, Suspense } from 'react'
import Loader from './components/Loader'

// Lazy load de páginas
const PortfolioPage = lazy(() => 
  import(/* webpackChunkName: "portfolio" */ './pages/PortfolioPage')
)

// Lazy load de componentes pesados
const Icon3D = lazy(() => 
  import(/* webpackChunkName: "3d-icons" */ './icons/Icon3D')
)

// Uso con Suspense
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Suspense>
  )
}
```

### Fallback Components
```jsx
// Loader específico para rutas
const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <span className="ml-3">Cargando página...</span>
  </div>
)

// Loader para componentes 3D
const Icon3DFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-gray-400">Cargando modelo 3D...</div>
  </div>
)
```

---

## 🔍 Parámetros y Query Strings

### Parámetros de Ruta
```jsx
// Definición de ruta con parámetro
<Route path="/case-study/:id" element={<CaseStudyPage />} />

// Acceso al parámetro
import { useParams } from 'react-router-dom'

function CaseStudyPage() {
  const { id } = useParams()
  
  // Fetch data basado en ID
  useEffect(() => {
    fetchCaseStudy(id)
  }, [id])
  
  return <div>Case Study: {id}</div>
}
```

### Query Parameters
```jsx
import { useSearchParams } from 'react-router-dom'

function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Leer query params
  const filter = searchParams.get('filter') || 'all'
  const page = searchParams.get('page') || 1
  
  // Actualizar query params
  const handleFilterChange = (newFilter) => {
    setSearchParams({ 
      filter: newFilter, 
      page: 1 
    })
  }
  
  return (
    <div>
      <select onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="all">Todos</option>
        <option value="wordpress">WordPress</option>
        <option value="react">React</option>
      </select>
    </div>
  )
}
```

### Estado de Navegación
```jsx
import { useLocation } from 'react-router-dom'

function CaseStudyPage() {
  const location = useLocation()
  const { from } = location.state || {}
  
  return (
    <div>
      {from && (
        <Link to={from}>← Volver</Link>
      )}
      {/* Contenido del caso de estudio */}
    </div>
  )
}
```

---

## ❌ Manejo de Errores

### Página 404
```jsx
// components/NotFound.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">
        Página no encontrada
      </p>
      <Link 
        to="/" 
        className="btn-primary"
      >
        Volver al Inicio
      </Link>
    </motion.div>
  )
}

export default NotFound
```

### Error Boundaries para Rutas
```jsx
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* más rutas */}
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}
```

### Redirecciones
```jsx
import { Navigate } from 'react-router-dom'

// Redirección simple
<Route path="/old-portfolio" element={<Navigate to="/portfolio" replace />} />

// Redirección condicional
function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth()
  
  return isAuthenticated ? children : <Navigate to="/login" />
}
```

---

## 🔍 SEO y Metadata

### React Helmet para Meta Tags
```bash
npm install react-helmet-async
```

```jsx
import { Helmet } from 'react-helmet-async'

function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio - Cloution | Proyectos SEVI</title>
        <meta name="description" content="Descubre nuestros proyectos desarrollados con filosofía SEVI" />
        <meta property="og:title" content="Portfolio Cloution" />
        <meta property="og:url" content="https://cloution.com/portfolio" />
        <link rel="canonical" href="https://cloution.com/portfolio" />
      </Helmet>
      {/* Contenido de la página */}
    </>
  )
}
```

### Sitemap Dinámico
```jsx
// utils/generateSitemap.js
const routes = [
  { path: '/', priority: 1.0 },
  { path: '/portfolio', priority: 0.8 },
  { path: '/case-study/proyecto-1', priority: 0.6 },
  // más rutas
]

export function generateSitemap() {
  return routes.map(route => ({
    url: `https://cloution.com${route.path}`,
    changefreq: 'weekly',
    priority: route.priority
  }))
}
```

---

## 🚀 Deployment Considerations

### Configuración para SPA en Diferentes Plataformas

#### Vercel (vercel.json)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Netlify (_redirects en public/)
```
/*    /index.html   200
```

#### Nginx
```nginx
server {
    listen 80;
    server_name cloution.com;
    root /var/www/cloution;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### Base URL para Subdirectorios
```jsx
// Si el sitio está en cloution.com/app/
<Router basename="/app">
  <Routes>
    {/* rutas */}
  </Routes>
</Router>

// vite.config.js
export default {
  base: '/app/'
}
```

---

## 🧪 Testing de Rutas

### Testing con React Testing Library
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('renders landing page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText(/Transformamos tu Futuro Digital/i)).toBeInTheDocument()
})

test('renders portfolio page', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText(/Proyectos/i)).toBeInTheDocument()
})
```

---

## 🔧 Hooks Útiles de React Router

### useLocation
```jsx
const location = useLocation()
console.log(location.pathname) // '/portfolio'
console.log(location.search)   // '?filter=react'
console.log(location.hash)     // '#proyecto-1'
console.log(location.state)    // { from: '/' }
```

### useNavigate
```jsx
const navigate = useNavigate()
navigate('/portfolio')
navigate(-1) // Atrás
navigate(1)  // Adelante
```

### useParams
```jsx
// Para ruta: /case-study/:id
const { id } = useParams()
```

### useSearchParams
```jsx
const [searchParams, setSearchParams] = useSearchParams()
const filter = searchParams.get('filter')
setSearchParams({ filter: 'react' })
```

### useMatch
```jsx
const match = useMatch('/portfolio')
if (match) {
  console.log('Estamos en portfolio')
}
```

---

## 📚 Recursos y Referencias

### Documentación
- [React Router v6 Docs](https://reactrouter.com/en/main)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Migration from v5](https://reactrouter.com/en/main/upgrading/v5)

### Ejemplos
- [Code Splitting con React Router](https://reactrouter.com/en/main/start/concepts#code-splitting)
- [Auth Example](https://github.com/remix-run/react-router/tree/main/examples/auth)
- [Animated Transitions](https://github.com/remix-run/react-router/tree/main/examples/animation)

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0.0  
**Mantenido por**: Equipo de Desarrollo Cloution
