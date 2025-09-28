// Solución temporal mejorada para el formulario de Google Forms
// Este archivo contiene la configuración corregida y métodos alternativos

// IMPORTANTE: Reemplaza estos valores con los IDs correctos de tu formulario
// Para obtenerlos, sigue las instrucciones en FORMULARIO_FIX.md

// Configuración estimada basada en el enlace proporcionado
// El enlace corto: https://forms.gle/cQYQMFmVXEEZmRpU6
// Necesita ser expandido para obtener el ID real

const GOOGLE_FORMS_CONFIG = {
  // OPCIÓN 1: Configuración directa (necesitas obtener estos valores)
  // Instrucciones:
  // 1. Abre https://forms.gle/cQYQMFmVXEEZmRpU6
  // 2. Si es tu formulario, haz clic en "Editar"
  // 3. Copia el ID de la URL: https://docs.google.com/forms/d/[ESTE_ES_EL_ID]/edit
  // 4. Usa el inspector de elementos para obtener los entry IDs
  
  formAction: 'https://docs.google.com/forms/d/e/[REEMPLAZA_CON_TU_FORM_ID]/formResponse',
  
  fields: {
    name: 'entry.XXXXXXXXX',      // Reemplaza con el ID real del campo nombre
    email: 'entry.XXXXXXXXX',     // Reemplaza con el ID real del campo email
    projectType: 'entry.XXXXXXXXX', // Reemplaza con el ID real del campo tipo de proyecto
    description: 'entry.XXXXXXXXX'  // Reemplaza con el ID real del campo descripción
  },

  // OPCIÓN 2: URL para iframe (solución temporal)
  iframeUrl: 'https://docs.google.com/forms/d/e/[REEMPLAZA_CON_TU_FORM_ID]/viewform?embedded=true'
};

// Función mejorada para enviar el formulario con mejor manejo de errores
export const submitToGoogleForm = async (formData) => {
  const payload = new FormData();
  
  // Mapear los datos del formulario a los campos de Google Forms
  payload.append(GOOGLE_FORMS_CONFIG.fields.name, formData.name);
  payload.append(GOOGLE_FORMS_CONFIG.fields.email, formData.email);
  payload.append(GOOGLE_FORMS_CONFIG.fields.projectType, formData.projectType);
  payload.append(GOOGLE_FORMS_CONFIG.fields.description, formData.description);

  try {
    const response = await fetch(GOOGLE_FORMS_CONFIG.formAction, {
      method: 'POST',
      mode: 'no-cors', // Necesario para Google Forms
      body: payload
    });

    // Con no-cors, no podemos leer la respuesta, así que asumimos éxito
    return { success: true, message: 'Formulario enviado correctamente' };
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return { success: false, message: 'Error al enviar el formulario', error };
  }
};

// Función alternativa usando un servicio proxy (más confiable)
export const submitWithProxy = async (formData) => {
  // Esta función usa un servicio proxy para evitar problemas de CORS
  // Considera usar servicios como:
  // - https://formsubmit.co/
  // - https://formspree.io/
  // - https://getform.io/
  
  const PROXY_URL = 'https://formsubmit.co/tu-email@example.com'; // Reemplaza con tu email
  
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        _subject: 'Nuevo mensaje desde Portfolio Cloution',
        _template: 'table' // Formato de tabla para el email
      })
    });

    if (response.ok) {
      return { success: true, message: 'Formulario enviado correctamente' };
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return { success: false, message: 'Error al enviar el formulario', error };
  }
};

// Función para validar el formulario antes de enviar
export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }
  
  if (!formData.projectType) {
    errors.projectType = 'Por favor selecciona un tipo de proyecto';
  }
  
  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Configuración para diferentes entornos
export const getFormConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isStaging = window.location.hostname.includes('staging');
  const isProduction = window.location.hostname.includes('cloution.com');
  
  if (isDevelopment) {
    console.log('🔧 Modo desarrollo: El formulario puede no funcionar correctamente con Google Forms');
    console.log('📋 Para testing, considera usar el iframe o un servicio proxy');
  }
  
  if (isStaging) {
    console.log('🚧 Modo staging: Verificando configuración del formulario...');
  }
  
  return {
    useProxy: isStaging || isDevelopment, // Usar proxy en staging y desarrollo
    useIframe: false, // Cambiar a true si prefieres usar iframe
    config: GOOGLE_FORMS_CONFIG
  };
};

// Exportar la configuración para usar en PortfolioPage.jsx
export default GOOGLE_FORMS_CONFIG;