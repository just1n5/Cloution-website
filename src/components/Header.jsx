import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { name: 'Inicio', href: '/', type: 'route' },
    { name: 'Nosotros', href: '#nosotros', type: 'anchor' },
    { name: 'Servicios', href: '#servicios', type: 'anchor' },
    { name: 'Portfolio', href: '/portafolio-web', type: 'route', highlight: true },
    { name: 'Desarrollo Web', href: '#desarrollo-web', type: 'anchor' },
    { name: 'Filosofía', href: '#filosofia', type: 'anchor' },
    { name: 'Contacto', href: '#contacto', type: 'anchor' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Solo detectar sección activa si estamos en el home
      if (location.pathname === '/') {
        const sections = ['inicio', 'nosotros', 'servicios', 'desarrollo-web', 'filosofia', 'contacto']
        const current = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        if (current) setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  const handleNavClick = (e, item) => {
    if (item.type === 'route') {
      // Para rutas, dejamos que React Router maneje la navegación
      setIsMobileMenuOpen(false)
      return
    }
    
    e.preventDefault()
    
    // Si estamos en una página diferente al home y queremos ir a una sección
    if (location.pathname !== '/' && item.type === 'anchor') {
      navigate('/')
      // Esperar a que se cargue el home y luego hacer scroll
      setTimeout(() => {
        const targetId = item.href.replace('#', '')
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Si ya estamos en home, solo hacer scroll
      const targetId = item.href.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMobileMenuOpen(false)
      }
    }
  }

  const isActive = (item) => {
    if (item.type === 'route') {
      return location.pathname === item.href
    }
    return location.pathname === '/' && activeSection === item.href.replace('#', '')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-galaxy-dark/95 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <img 
                src="/logo.svg" 
                alt="Cloution Logo" 
                className="w-9 h-9"
              />
              <span className="text-2xl font-bold gradient-text">Cloution</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isItemActive = isActive(item)
              
              return item.type === 'route' ? (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`relative transition-colors duration-300 ${
                      isItemActive 
                        ? 'text-white font-semibold' 
                        : 'text-gray-300 hover:text-white'
                    } ${item.highlight ? 'px-4 py-2 border border-neon-blue/30 rounded-lg hover:bg-neon-blue/10' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.highlight && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full">
                        Nuevo
                      </span>
                    )}
                    {isItemActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative transition-colors duration-300 ${
                    isItemActive 
                      ? 'text-white font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {isItemActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              )
            })}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              onClick={() => navigate('/#contacto')}
            >
              Comenzar Ahora
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => {
                  const isItemActive = isActive(item)
                  
                  return item.type === 'route' ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`py-2 transition-colors duration-300 ${
                        isItemActive 
                          ? 'text-white font-semibold' 
                          : 'text-gray-300 hover:text-white'
                      } ${item.highlight ? 'px-4 py-2 border border-neon-blue/30 rounded-lg' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.highlight && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full">
                          Nuevo
                        </span>
                      )}
                    </Link>
                  ) : (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`py-2 transition-colors duration-300 ${
                        isItemActive 
                          ? 'text-white font-semibold' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                })}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    navigate('/#contacto')
                  }}
                >
                  Comenzar Ahora
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header
