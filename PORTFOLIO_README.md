# 📁 Portfolio - Guía de Mantenimiento

## 🚀 Estado Actual

El portfolio está completamente funcional con las siguientes características implementadas:

### ✅ Características Completadas

1. **Click en Proyectos**: Al hacer click en cualquier proyecto se abre un modal con detalles completos
2. **Videos en Hover**: Los videos se reproducen automáticamente al pasar el mouse sobre los proyectos
3. **Modal de Detalles**: Muestra toda la información del proyecto incluyendo:
   - Galería de imágenes (desktop, móvil, tablet)
   - Descripción completa
   - Tecnologías utilizadas
   - Características principales
   - Testimonios de clientes
   - Métricas de éxito
   - Enlace al sitio en vivo
4. **Proceso de Trabajo**: Sección con líneas conectoras arregladas y animaciones mejoradas
5. **Efectos Visuales**: 
   - Indicador "Click para ver detalles" en hover
   - Efectos de fondo decorativos
   - Animaciones suaves y transiciones

## 📋 Cómo Actualizar el Portfolio

### Agregar un Nuevo Proyecto

1. **Preparar las imágenes**:
   - Desktop: 1920x1080px (PNG)
   - Móvil: 375x812px (PNG)
   - Tablet: 768x1024px (PNG)
   - Video (opcional): MP4, máximo 10MB

2. **Colocar archivos en la carpeta correcta**:
   ```
   src/portfolio_screenshots/[nombre-proyecto]/
   ├── proyecto_desktop.png
   ├── proyecto_movil.png
   ├── proyecto_tablet.png
   └── proyecto_video.mp4 (opcional)
   ```

3. **Actualizar portfolioData.js**:
   ```javascript
   {
     id: 5,
     slug: 'nuevo-proyecto',
     name: 'Nombre del Proyecto',
     category: ['wordpress', 'ecommerce'],
     images: {
       desktop: '/src/portfolio_screenshots/nuevo-proyecto/desktop.png',
       mobile: '/src/portfolio_screenshots/nuevo-proyecto/movil.png',
       tablet: '/src/portfolio_screenshots/nuevo-proyecto/tablet.png'
     },
     video: '/src/portfolio_screenshots/nuevo-proyecto/video.mp4', // opcional
     technologies: ['WordPress', 'React', etc...],
     description: 'Descripción breve',
     features: [
       'Característica 1',
       'Característica 2',
       // ...
     ],
     client: 'Nombre del Cliente',
     year: '2024',
     result: 'Resultado principal obtenido',
     metrics: {
       performance: '98%',
       seo: '100%',
       conversions: '+150%',
       loadTime: '1.2s'
     },
     testimonial: {
       text: 'Testimonio del cliente',
       author: 'Nombre',
       position: 'Cargo - Empresa'
     },
     liveUrl: 'https://sitioweb.com',
     color: '#hexcolor'
   }
   ```

4. **Copiar imágenes a public/**:
   ```bash
   .\copy_portfolio_images.bat
   ```

## 🔧 Solución de Problemas Comunes

### Las imágenes no se muestran
- Ejecutar: `.\copy_portfolio_images.bat`
- Verificar las rutas en portfolioData.js
- Asegurarse de que las imágenes estén en la carpeta correcta

### El modal no abre
- Verificar que el proyecto tenga todos los campos requeridos en portfolioData.js
- Revisar la consola del navegador para errores

### El video no se reproduce
- Verificar que el formato sea MP4
- El archivo debe ser menor a 10MB
- La ruta debe estar correcta en portfolioData.js

## 📱 Responsive Design

El portfolio está optimizado para:
- **Desktop**: 1920x1080 y superior
- **Laptop**: 1366x768
- **Tablet**: 768x1024 (iPad)
- **Móvil**: 375x812 (iPhone X y superior)

## 🎨 Personalización Visual

### Cambiar colores del tema
En `src/pages/PortfolioPage.jsx`:
```css
/* Línea 289 - Colores de fondo */
bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900

/* Efectos de partículas */
bg-blue-500/10  /* Azul */
bg-purple-500/10 /* Púrpura */
bg-teal-500/5   /* Verde azulado */
```

### Ajustar animaciones
Las animaciones usan Framer Motion. Para modificar:
```javascript
// Velocidad de animación
transition={{ duration: 0.3, delay: index * 0.1 }}

// Tipo de animación
whileHover={{ y: -8 }}
```

## 🚀 Optimización de Performance

### Recomendaciones:
1. **Imágenes**: Usar formato WebP cuando sea posible
2. **Videos**: Comprimir a menos de 5MB
3. **Lazy Loading**: Ya implementado para el modal
4. **Code Splitting**: Los componentes ya están optimizados

## 📊 Analytics y Tracking

Para agregar tracking a los clics del portfolio:
```javascript
const handleCardClick = (e) => {
  // Agregar aquí Google Analytics o tu sistema de tracking
  gtag('event', 'portfolio_click', {
    'project_name': project.name,
    'project_category': project.category
  });
  
  openProjectModal(project);
};
```

## 📝 Notas Importantes

1. **Siempre hacer backup** antes de actualizar proyectos
2. **Probar en local** antes de subir a producción
3. **Optimizar imágenes** antes de agregarlas (TinyPNG, etc.)
4. **Mantener consistencia** en nombres de archivos y estructura

## 🆘 Soporte

Si necesitas ayuda:
- Revisa esta documentación
- Verifica los logs del navegador (F12)
- Contacta al equipo de desarrollo

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0.0  
**Mantenido por**: Equipo Cloution
