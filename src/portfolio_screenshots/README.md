# 📁 Portfolio - Documentación

## 📸 Screenshots y Videos

Las capturas de pantalla y videos de los proyectos se encuentran en:
```
src/portfolio_screenshots/
├── Cosnultorio jde abogados Legispro/
│   ├── Legispro_desktop.png
│   ├── Legispro_movil.png
│   ├── Legispro_tablet.png
│   └── LegisPro_Video.mp4
├── Marca de cafe premium aromas de origen/
│   ├── Aromas de origen_Desktop.png
│   ├── Aromas de origen_movil.png
│   ├── Aromas de origen_tablet.png
│   └── Aromas de origen.mp4
├── Restaurante el sabor de soacha/
│   ├── Restaurante el sabor de soacha_desktop.png
│   ├── Restaurante el sabor de soacha_movil.png
│   ├── Restaurante el sabor de soacha_tablet.png
│   └── Restaurante el sabor de soacha_video.mp4
└── Sonrisa sana clinica dental/
    ├── Sonrisa sana Clinica dental_desktop.png
    ├── Sonrisa sana_movil.png
    └── Sonrisa sana_tablet.png
```

## 🎯 Proyectos Actuales

### 1. LegisPro - Consultorio de Abogados
- **Cliente**: LegisPro Consultores
- **Categorías**: WordPress, Corporativo, Profesional
- **Tecnologías**: WordPress, Elementor Pro, MySQL, PHP, SEO, SSL
- **Resultado**: Aumento del 150% en consultas online
- **Año**: 2024

### 2. Aromas de Origen - Café Premium
- **Cliente**: Aromas de Origen S.A.
- **Categorías**: WordPress, E-commerce, Premium
- **Tecnologías**: WordPress, WooCommerce, Stripe, Custom Theme, AJAX, PWA
- **Resultado**: 200% de incremento en ventas online
- **Año**: 2024

### 3. El Sabor de Soacha
- **Cliente**: Restaurante El Sabor
- **Categorías**: WordPress, Corporativo, Restaurante
- **Tecnologías**: WordPress, Custom Theme, OpenTable API, Google Maps, Schema.org
- **Resultado**: 80% más reservas online
- **Año**: 2024

### 4. Sonrisa Sana - Clínica Dental
- **Cliente**: Clínica Sonrisa Sana
- **Categorías**: WordPress, Corporativo, Salud
- **Tecnologías**: WordPress, Elementor, Calendar API, WhatsApp Business, SSL
- **Resultado**: 120% más citas agendadas
- **Año**: 2024

## 🔧 Configuración

### Archivo de Datos
Los datos del portfolio están centralizados en:
```javascript
src/data/portfolioData.js
```

Este archivo contiene:
- `portfolioProjects`: Array con todos los proyectos
- `portfolioCategories`: Categorías disponibles
- `workProcess`: Proceso de trabajo
- `portfolioStats`: Estadísticas generales
- `technologies`: Tecnologías que usamos

### Componente Principal
```javascript
src/pages/PortfolioPage.jsx
```

### Características del Componente

#### Video en Hover
Los proyectos que tienen video lo mostrarán automáticamente al hacer hover sobre la tarjeta.

#### Filtros Dinámicos
- Todos
- WordPress
- E-commerce
- Corporativo
- Profesional
- Salud
- Restaurante
- Premium

#### Información de Proyecto
Cada proyecto muestra:
- Imagen principal (desktop, mobile, tablet)
- Video (si está disponible)
- Año del proyecto
- Cliente
- Resultado principal
- Tecnologías usadas
- Features principales

## 📝 Cómo Agregar un Nuevo Proyecto

1. **Agregar las imágenes y videos** en la carpeta:
   ```
   src/portfolio_screenshots/[Nombre del Proyecto]/
   ```

2. **Actualizar el archivo** `src/data/portfolioData.js`:
   ```javascript
   {
     id: 5,
     slug: 'nuevo-proyecto',
     name: 'Nombre del Proyecto',
     category: ['wordpress', 'corporativo'],
     images: {
       desktop: '/src/portfolio_screenshots/[carpeta]/desktop.png',
       mobile: '/src/portfolio_screenshots/[carpeta]/mobile.png',
       tablet: '/src/portfolio_screenshots/[carpeta]/tablet.png'
     },
     video: '/src/portfolio_screenshots/[carpeta]/video.mp4', // o null
     technologies: ['WordPress', 'etc'],
     description: 'Descripción breve',
     features: [
       'Feature 1',
       'Feature 2'
     ],
     client: 'Nombre del Cliente',
     year: '2024',
     result: 'Resultado principal',
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
     link: 'https://ejemplo.com',
     color: '#hexcolor'
   }
   ```

3. **Si es una nueva categoría**, agregar el filtro en el componente `PortfolioPage.jsx`:
   ```javascript
   const filters = [
     // ... filtros existentes
     { id: 'nueva-categoria', label: 'Nueva Categoría', icon: IconName }
   ];
   ```

## 🎨 Personalización Visual

### Colores de Proyecto
Cada proyecto puede tener un color personalizado que se usa en hover y detalles:
```javascript
color: '#1e40af' // Azul para LegisPro
color: '#92400e' // Marrón para Aromas de Origen
color: '#dc2626' // Rojo para El Sabor
color: '#059669' // Verde para Sonrisa Sana
```

### Grid Layout
El grid está configurado para mostrar 2 proyectos por fila en desktop:
```javascript
className="grid md:grid-cols-2 lg:grid-cols-2 gap-12"
```

Para cambiar a 3 columnas:
```javascript
className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
```

## 🚀 Optimización

### Lazy Loading de Videos
Los videos solo se cargan cuando el usuario hace hover sobre el proyecto.

### Compresión de Imágenes
Se recomienda:
- Desktop: Max 2MB
- Mobile: Max 1MB
- Tablet: Max 1.5MB
- Videos: Max 50MB (considerar compresión)

### Formatos Recomendados
- Imágenes: PNG o WebP
- Videos: MP4 con codec H.264

## 📱 Responsive

El componente es completamente responsive:
- **Mobile**: 1 columna, imágenes optimizadas
- **Tablet**: 2 columnas
- **Desktop**: 2 columnas (configurable a 3)

## 🔍 SEO

Cada proyecto incluye:
- Alt text descriptivo
- Título optimizado
- Descripción detallada
- Schema.org markup (implementable)

## 📊 Métricas de Éxito

El portfolio muestra estadísticas generales:
- **50+** Clientes Felices
- **100%** Satisfacción
- **137%** Crecimiento Promedio
- **5+** Años de Experiencia

## 🛠️ Troubleshooting

### Las imágenes no se ven
1. Verificar que las rutas en `portfolioData.js` sean correctas
2. Verificar que los archivos existan en `src/portfolio_screenshots/`
3. Revisar la consola del navegador para errores

### Los videos no se reproducen
1. Verificar formato MP4
2. Verificar que el archivo no esté corrupto
3. Revisar permisos del archivo

### Los filtros no funcionan
1. Verificar que las categorías en `portfolioData.js` coincidan con los filtros
2. Revisar la consola para errores de JavaScript

## 📧 Soporte

Para cualquier problema o sugerencia sobre el portfolio:
- Email: dev@cloution.com
- GitHub: [issues]

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0
**Mantenido por**: Equipo Cloution
