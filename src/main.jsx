import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Lazy loading de páginas secundarias
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage.jsx'))
const IconsTestSimple = lazy(() => import('./components/IconsTestSimple.jsx'))

// Componente de carga mientras se cargan las páginas lazy
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-400 animate-pulse">Cargando...</p>
    </div>
  </div>
)

// Layout wrapper para mantener elementos comunes
const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white overflow-x-hidden">
        {children}
      </div>
    </ErrorBoundary>
  );
};

// Página 404
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">{'P\u00E1gina no encontrada'}</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Ruta principal - Homepage con todas las secciones */}
          <Route path="/" element={
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          } />
          
          {/* Ruta del portafolio */}
          <Route path="/portafolio-web" element={
            <Layout>
              <PortfolioPage />
            </Layout>
          } />
          
          {/* Rutas dinámicas para casos de estudio */}
          <Route path="/portafolio/:slug" element={
            <Layout>
              <CaseStudyPage />
            </Layout>
          } />
          
          {/* Ruta para el visualizador de iconos 3D */}
          <Route path="/3d-icons-test" element={
            <IconsTestSimple />
          } />
          
          {/* Ruta 404 - Página no encontrada */}
          <Route path="*" element={
            <Layout>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
)
