// Solución alternativa usando FormSubmit.co (GRATUITO y sin configuración compleja)
// Este servicio envía los datos del formulario directamente a tu email

const FORMSUBMIT_CONFIG = {
  // PASO 1: Reemplaza con tu email real
  endpoint: 'https://formsubmit.co/ajax/tu-email@ejemplo.com', // <-- CAMBIA ESTO
  
  // Configuración adicional
  settings: {
    _subject: 'Nuevo mensaje desde Portfolio Cloution',
    _captcha: false, // Desactivar captcha para testing
    _template: 'table', // Formato de tabla en el email
    _autoresponse: true, // Respuesta automática al usuario
    _replyto: true // Usar el email del usuario como reply-to
  }
};

// Función para enviar usando FormSubmit
export const sendViaFormSubmit = async (formData) => {
  const payload = {
    ...formData,
    ...FORMSUBMIT_CONFIG.settings
  };

  try {
    const response = await fetch(FORMSUBMIT_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      return { 
        success: true, 
        message: '¡Mensaje enviado correctamente! Te contactaremos pronto.' 
      };
    } else {
      throw new Error(data.message || 'Error al enviar el formulario');
    }
  } catch (error) {
    console.error('Error:', error);
    return { 
      success: false, 
      message: 'Error al enviar el formulario. Por favor intenta más tarde.',
      error 
    };
  }
};

// Configuración para Google Forms (mantener como respaldo)
const GOOGLE_FORMS_CONFIG = {
  // Para obtener estos valores:
  // 1. Abre tu Google Form: https://forms.gle/cQYQMFmVXEEZmRpU6
  // 2. Haz clic derecho en cada campo → Inspeccionar
  // 3. Busca name="entry.XXXXX"
  formAction: 'https://docs.google.com/forms/d/e/1FAIpQLSe_TU_FORM_ID_AQUI/formResponse',
  fields: {
    name: 'entry.XXXXXXXXX',
    email: 'entry.XXXXXXXXX',
    projectType: 'entry.XXXXXXXXX',
    description: 'entry.XXXXXXXXX'
  }
};

// Función principal que intenta ambos métodos
export const submitForm = async (formData) => {
  // Primero intenta con FormSubmit (más confiable)
  const formSubmitResult = await sendViaFormSubmit(formData);
  
  if (formSubmitResult.success) {
    return formSubmitResult;
  }
  
  // Si falla, intenta con Google Forms como respaldo
  console.log('FormSubmit falló, intentando con Google Forms...');
  
  const payload = new FormData();
  Object.keys(formData).forEach(key => {
    if (GOOGLE_FORMS_CONFIG.fields[key]) {
      payload.append(GOOGLE_FORMS_CONFIG.fields[key], formData[key]);
    }
  });

  try {
    await fetch(GOOGLE_FORMS_CONFIG.formAction, {
      method: 'POST',
      mode: 'no-cors',
      body: payload
    });
    
    // Con no-cors no podemos verificar el éxito, asumimos que funcionó
    return { 
      success: true, 
      message: 'Formulario enviado (Google Forms)' 
    };
  } catch (error) {
    return { 
      success: false, 
      message: 'Error al enviar el formulario',
      error 
    };
  }
};

export default {
  submitForm,
  sendViaFormSubmit,
  FORMSUBMIT_CONFIG,
  GOOGLE_FORMS_CONFIG
};