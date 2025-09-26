// 🔐 Utilidades de Seguridad - Cloution Website

/**
 * Sanitiza texto para prevenir XSS
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeInput = (text) => {
  if (!text) return '';
  
  // Remover tags HTML y scripts
  return text
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+\s*=/gi, '') // Remover event handlers
    .trim();
};

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que un string no tenga caracteres peligrosos
 * @param {string} input - Input a validar
 * @returns {boolean} true si es seguro
 */
export const isSafeInput = (input) => {
  // Detectar patrones sospechosos
  const dangerousPatterns = [
    /<script/i,
    /<iframe/i,
    /javascript:/i,
    /onclick/i,
    /onerror/i,
    /onload/i,
    /<img.*src/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /\.innerHTML/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Rate limiting simple para formularios
 */
class RateLimiter {
  constructor(maxAttempts = 3, windowMs = 60000) { // 3 intentos por minuto
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key) {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Limpiar intentos antiguos
    const recentAttempts = userAttempts.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Registrar nuevo intento
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    // Limpiar memoria cada cierto tiempo
    if (this.attempts.size > 100) {
      this.cleanup();
    }
    
    return true;
  }
  
  cleanup() {
    const now = Date.now();
    for (const [key, attempts] of this.attempts.entries()) {
      const recentAttempts = attempts.filter(
        timestamp => now - timestamp < this.windowMs
      );
      if (recentAttempts.length === 0) {
        this.attempts.delete(key);
      } else {
        this.attempts.set(key, recentAttempts);
      }
    }
  }
  
  getRemainingTime(key) {
    const userAttempts = this.attempts.get(key) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const remainingMs = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, Math.ceil(remainingMs / 1000)); // Retorna segundos
  }
}

// Instancia global del rate limiter
export const formRateLimiter = new RateLimiter(3, 60000); // 3 envíos por minuto

/**
 * Genera un token CSRF simple
 * @returns {string} Token CSRF
 */
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Valida un token CSRF
 * @param {string} token - Token a validar
 * @param {string} storedToken - Token almacenado
 * @returns {boolean} true si es válido
 */
export const validateCSRFToken = (token, storedToken) => {
  return token && storedToken && token === storedToken;
};

/**
 * Headers de seguridad recomendados
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

/**
 * Content Security Policy
 */
export const contentSecurityPolicy = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.google-analytics.com', 'https://www.googletagmanager.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'", 'https://api.cloution.com', 'https://docs.google.com'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", 'https://docs.google.com']
};

/**
 * Detecta intentos de inyección SQL básicos
 * @param {string} input - Input a verificar
 * @returns {boolean} true si es sospechoso
 */
export const detectSQLInjection = (input) => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|FROM|WHERE)\b)/gi,
    /('|(--|\/\*|\*\/|;))/g,
    /(1=1|OR\s+1=1|AND\s+1=1)/gi
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

/**
 * Limpia URLs para prevenir Open Redirect
 * @param {string} url - URL a limpiar
 * @returns {string} URL segura
 */
export const sanitizeURL = (url) => {
  if (!url) return '#';
  
  // Solo permitir URLs relativas o de dominios confiables
  const trustedDomains = [
    'cloution.com',
    'github.com',
    'linkedin.com',
    'twitter.com'
  ];
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    // Si es una URL relativa, está bien
    if (urlObj.origin === window.location.origin) {
      return url;
    }
    
    // Verificar si es un dominio confiable
    const isTrusted = trustedDomains.some(domain => 
      urlObj.hostname.includes(domain)
    );
    
    return isTrusted ? url : '#';
  } catch {
    // Si no es una URL válida, devolver #
    return '#';
  }
};

/**
 * Encripta datos sensibles (básico, no para producción real)
 * Para producción usar una librería como crypto-js
 */
export const simpleEncrypt = (text, key = 'cloution-2024') => {
  // Este es un ejemplo básico, en producción usar crypto-js o similar
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(result); // Base64 encode
};

export const simpleDecrypt = (encodedText, key = 'cloution-2024') => {
  try {
    const text = atob(encodedText); // Base64 decode
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  } catch {
    return null;
  }
};

/**
 * Validación de tipos de archivo seguros
 */
export const isSafeFileType = (filename) => {
  const safeExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
    '.pdf', '.doc', '.docx', '.txt', '.csv', '.xlsx'
  ];
  
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return safeExtensions.includes(ext);
};

export default {
  sanitizeInput,
  validateEmail,
  isSafeInput,
  formRateLimiter,
  generateCSRFToken,
  validateCSRFToken,
  securityHeaders,
  contentSecurityPolicy,
  detectSQLInjection,
  sanitizeURL,
  simpleEncrypt,
  simpleDecrypt,
  isSafeFileType
};
