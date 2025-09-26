import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  Heart,
  ExternalLink,
  X,
  Download
} from 'lucide-react'
import termsPdf from '../../legal_docs/T\u00E9rminos de Servicio de Cloution S.A.S..pdf?url'
import privacyPdf from '../../legal_docs/Politica de privacidad.pdf?url'
import cookiesPdf from '../../legal_docs/Politica de cookies.pdf?url'
import securityPdf from '../../legal_docs/Pol\u00EDtica de Seguridad de Cloution.pdf?url'

const LegalDocumentModal = ({ document, onClose }) => (
  <AnimatePresence>
    {document ? (
      <motion.div
        key={document.href}
        className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 shadow-2xl"
        >
          <div className="flex items-start justify-between border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue/70">
                Legal
              </p>
              <h2 className="text-2xl font-bold text-white">{document.name}</h2>
              <p className="mt-1 text-sm text-gray-400">
                Revisa el documento en línea o descárgalo para consultarlo con tu equipo.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:border-neon-blue/40 hover:text-white"
              aria-label="Cerrar visor de documento"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="relative h-[60vh] bg-slate-950">
            <iframe
              src={document.href}
              title={document.name}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>

          <div className="flex flex-col items-start gap-4 border-t border-white/10 px-6 py-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
            <p>Si la vista previa no carga correctamente, utiliza el botón de descarga.</p>
            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-neon-blue/40 hover:text-white md:w-auto"
              >
                Cerrar
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={document.href}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-neon-blue/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neon-blue/20 transition-colors hover:bg-neon-blue md:w-auto"
              >
                <Download className="h-4 w-4" />
                Descargar PDF
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [selectedDocument, setSelectedDocument] = useState(null)

  const footerLinks = {
    nosotros: [
      { name: 'Sobre Cloution', href: '#nosotros' },
      { name: 'Casos de Éxito', href: '#casos' },
    ],
    servicios: [
      { name: 'Pulse Monitor', href: '#pulse' },
      { name: 'Lexia AI', href: '#lexia' },
      { name: 'NexoPOS', href: '#datavault' },
    ],
    legal: [
      { name: 'Términos de Servicio', href: termsPdf, type: 'pdf' },
      { name: 'Política de Privacidad', href: privacyPdf, type: 'pdf' },
      { name: 'Política de Cookies', href: cookiesPdf, type: 'pdf' },
      { name: 'Política de Seguridad', href: securityPdf, type: 'pdf' },
      { name: 'SLA', href: '#sla' },
    ],
  }

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61581072004457',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/cloutionsas/',
      label: 'Instagram'
    },
    {
      icon: Twitter,
      href: 'https://x.com/Cloutionsas',
      label: 'X (Twitter)'
    }
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

  const closeModal = () => setSelectedDocument(null)

  return (
    <React.Fragment>
      <footer id="contacto" className="relative pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
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
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.type === 'pdf') {
                          e.preventDefault()
                          setSelectedDocument(link)
                        } else {
                          handleLinkClick(e, link.href)
                        }
                      }}
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

        {/* Divider sustituyendo al formulario */}
        <div className="border-t border-white/10 my-8" />

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
      <LegalDocumentModal document={selectedDocument} onClose={closeModal} />
    </React.Fragment>
  )
}

export default Footer
