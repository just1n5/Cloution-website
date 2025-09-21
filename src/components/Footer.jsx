import React from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  Heart,
  ExternalLink
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    nosotros: [
      { name: 'Sobre Cloution', href: '#nosotros' },
      { name: 'Equipo', href: '#equipo' },
      { name: 'Carreras', href: '#carreras' },
      { name: 'Blog', href: '#blog' },
      { name: 'Casos de Éxito', href: '#casos' },
    ],
    servicios: [
      { name: 'Pulse Monitor', href: '#pulse' },
      { name: 'Lexia AI', href: '#lexia' },
      { name: 'DataVault', href: '#datavault' },
      { name: 'CloudForge', href: '#cloudforge' },
      { name: 'Consultoría', href: '#consultoria' },
    ],
    recursos: [
      { name: 'Documentación', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Guías', href: '#guias' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Certificaciones', href: '#certificaciones' },
    ],
    legal: [
      { name: 'Términos de Servicio', href: '#terminos' },
      { name: 'Política de Privacidad', href: '#privacidad' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'SLA', href: '#sla' },
      { name: 'Seguridad', href: '#seguridad' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ]

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer id="contacto" className="relative pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.svg" 
                  alt="Cloution Logo" 
                  className="w-9 h-9"
                />
                <span className="text-2xl font-bold gradient-text">Cloution</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transformamos empresas con tecnología de vanguardia. 
                Tu socio estratégico en la era digital.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:contacto@cloution.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contacto@cloution.com</span>
                </a>
                <a 
                  href="tel:+573001234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+57 300 123 4567</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>Bogotá, Colombia<br />Carrera 15 #88-64</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Nosotros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">Nosotros</h3>
              <ul className="space-y-2">
                {footerLinks.nosotros.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-neon-blue transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Servicios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold text-white mb-4">Servicios</h3>
              <ul className="space-y-2">
                {footerLinks.servicios.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recursos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-semibold text-white mb-4">Recursos</h3>
              <ul className="space-y-2">
                {footerLinks.recursos.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-8 mb-8 border-y border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Suscríbete a nuestro Newsletter
              </h3>
              <p className="text-gray-400">
                Recibe las últimas novedades en tecnología y transformación digital
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-gray-400 mb-2">
              © {currentYear} Cloution. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
              Desarrollado con <Heart className="w-4 h-4 text-red-500 animate-pulse" /> en Colombia
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
