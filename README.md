# 🚀 Cloution Website

Landing page moderna e interactiva para Cloution - Consultora tecnológica B2B especializada en SaaS y desarrollo de software con capacidades 3D avanzadas.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.158.0-000000?style=flat-square&logo=three.js)](https://threejs.org)

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño "Galaxia Digital"**: Experiencia visual inmersiva con animaciones fluidas
- **Sistema de Iconos 3D**: Iconos interactivos personalizados con Three.js
- **Glass Morphism**: Efectos de cristal modernos y elegantes
- **Partículas Animadas**: Background dinámico con canvas interactivo
- **Filosofía SEVI**: Sistema de valores integrado (Seguridad, Escalabilidad, Velocidad, Innovación)

### 💻 Tecnología
- **SPA con Routing**: Navegación fluida con React Router DOM
- **Componentes 3D**: Modelos y animaciones 3D con React Three Fiber
- **Totalmente Responsive**: Adaptado para todos los dispositivos
- **Animaciones Avanzadas**: Transiciones suaves con Framer Motion
- **Optimizado para Performance**: Lazy loading y code splitting

### 📄 Páginas y Secciones
- **Landing Page**: Hero, About, Features, Services, Philosophy, CTA
- **Portfolio**: Galería de proyectos realizados
- **Case Studies**: Casos de éxito detallados
- **Web Development**: Servicios especializados en WordPress y React

## 🛠️ Stack Tecnológico

### Core
- **[React 18.3.1](https://react.dev)** - Framework de UI
- **[Vite 5.3.4](https://vitejs.dev)** - Build tool ultrarrápido
- **[React Router DOM 6.20.0](https://reactrouter.com)** - Sistema de routing

### Estilos y Animaciones
- **[Tailwind CSS 3.4.0](https://tailwindcss.com)** - Estilos utility-first
- **[Framer Motion 11.0.0](https://www.framer.com/motion/)** - Animaciones avanzadas
- **[PostCSS](https://postcss.org)** - Procesamiento de CSS

### 3D y Gráficos
- **[Three.js 0.158.0](https://threejs.org)** - Motor 3D
- **[@react-three/fiber 8.18.0](https://docs.pmnd.rs/react-three-fiber)** - React renderer para Three.js
- **[@react-three/drei 9.122.0](https://github.com/pmndrs/drei)** - Utilidades para R3F
- **[postprocessing 6.37.7](https://github.com/pmndrs/postprocessing)** - Efectos post-procesamiento

### Utilidades
- **[Lucide React 0.263.1](https://lucide.dev)** - Iconografía moderna
- **[React Intersection Observer 9.5.3](https://github.com/thebuilder/react-intersection-observer)** - Detección de viewport

## 📦 Instalación

### Pre-requisitos
- Node.js 18+ 
- npm 9+ o yarn
- Git

### Pasos de Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/cloution/website.git
cd Cloution_Website
```

2. **Instala las dependencias:**
```bash
npm install
# o
yarn install
```

3. **Configura las variables de entorno (opcional):**
```bash
cp .env.example .env.local
```

4. **Inicia el servidor de desarrollo:**
```bash
npm run dev
# o usando el script de Windows
./start.bat
```

5. **Abre tu navegador en:** `http://localhost:5173`

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Inicia servidor de desarrollo
npm run dev:debug    # Modo debug con más información
npm start           # Alias de npm run dev
```

### Construcción
```bash
npm run build       # Build de producción
npm run preview     # Preview del build
```

### Mantenimiento
```bash
npm run lint        # Ejecutar ESLint
npm run clean       # Limpiar node_modules y dist
npm run reinstall   # Reinstalar dependencias
npm run fix         # Limpiar caché y forzar instalación
```

### Scripts Especiales (Windows)
```batch
RUN.bat                    # Inicio rápido del proyecto
start.bat                  # Script de inicio alternativo
TEST_HERO_V2.bat          # Test del componente Hero v2
TEST_LOGO.bat             # Test de logos animados
TEST_SEVI.bat             # Test del sistema SEVI
VERIFY_ALL_LOGOS.bat      # Verificación de todos los logos
```

## 📁 Estructura del Proyecto

```
Cloution_Website/
├── 📁 .vscode/              # Configuración del editor
├── 📁 docs/                 # Documentación completa
│   ├── ARCHITECTURE.md      # Arquitectura técnica
│   ├── COMPONENT_MAP.md     # Mapa de componentes
│   ├── DESIGN_SYSTEM.md     # Sistema de diseño
│   ├── DEPLOYMENT.md        # Guía de despliegue
│   ├── SEVI_PHILOSOPHY.md   # Filosofía SEVI
│   └── ...
├── 📁 public/               # Assets estáticos
├── 📁 src/                  # Código fuente
│   ├── 📁 components/       # Componentes React
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── WebDevPromo.jsx  # Promoción desarrollo web
│   │   └── ...
│   ├── 📁 icons/            # Sistema de iconos 3D
│   │   ├── FrontendIcon3D.jsx
│   │   ├── BackendIcon3D.jsx
│   │   ├── SecurityIcon3D.jsx
│   │   └── ...
│   ├── 📁 pages/            # Páginas de la aplicación
│   │   ├── PortfolioPage.jsx
│   │   └── CaseStudyPage.jsx
│   ├── 📁 hooks/            # Custom React hooks
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── 📁 utils/                # Utilidades y helpers
├── .env.example             # Variables de entorno ejemplo
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── tailwind.config.js       # Configuración de Tailwind
```

## 🎨 Sistema de Iconos 3D

El proyecto incluye un sistema avanzado de iconos 3D personalizados:

### Iconos Disponibles
- **Frontend**: Desarrollo frontend con React/Vue/Angular
- **Backend**: Servicios y APIs backend
- **Cloud/DevOps**: Infraestructura y despliegue
- **Security**: Seguridad y protección
- **AI/Data**: Inteligencia artificial y datos
- **UX/UI**: Diseño y experiencia de usuario
- **APIs/Automation**: Integración y automatización

### Uso
```jsx
import FrontendIcon3D from '@/icons/FrontendIcon3D'

<FrontendIcon3D 
  size={200} 
  color="#2563eb"
  animate={true}
/>
```

## 🏗️ Build para Producción

### Build Estándar
```bash
npm run build
```

### Configuración para Diferentes Plataformas

#### Vercel
```bash
# El proyecto está listo para Vercel out-of-the-box
vercel
```

#### Netlify
```bash
# Configurar _redirects para SPA routing
echo "/*    /index.html   200" > public/_redirects
npm run build
```

#### Docker
```bash
docker build -t cloution-website .
docker run -p 3000:80 cloution-website
```

## 🚢 Deployment

### Consideraciones Importantes
- **React Router**: Configurar redirects para SPA
- **Assets 3D**: Los modelos pueden ser pesados, considerar CDN
- **Variables de Entorno**: Configurar en el servicio de hosting

### Servicios Recomendados
1. **Vercel** - Zero config, optimizado para React
2. **Netlify** - Gran DX y características adicionales
3. **AWS Amplify** - Escalabilidad empresarial
4. **Cloudflare Pages** - CDN global incluido

Para más detalles, consulta [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📊 Performance

### Métricas Objetivo
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse Score**: > 90

### Optimizaciones Implementadas
- ✅ Code splitting automático con Vite
- ✅ Lazy loading de componentes pesados
- ✅ Optimización de imágenes y assets
- ✅ Minificación y compresión gzip
- ✅ Tree shaking de dependencias

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
VITE_API_URL=https://api.cloution.com
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_ENABLE_3D=true
VITE_ENABLE_ANALYTICS=true
```

### Personalización de Tailwind
Ver `tailwind.config.js` para personalizar:
- Colores de marca
- Tipografía
- Breakpoints
- Animaciones personalizadas

## 🐛 Solución de Problemas

### Problemas Comunes

#### Error con dependencias 3D
```bash
npm run fix
# o
npm cache clean --force
npm install --force
```

#### Error de memoria en desarrollo
```bash
# Aumentar memoria de Node
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

#### Iconos 3D no se renderizan
- Verificar que WebGL esté habilitado en el navegador
- Revisar la consola para errores de Three.js

Para más soluciones, consulta [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

## 📚 Documentación Adicional

- 📖 [Arquitectura del Proyecto](./docs/ARCHITECTURE.md)
- 🎨 [Sistema de Diseño](./docs/DESIGN_SYSTEM.md)
- 🗺️ [Mapa de Componentes](./docs/COMPONENT_MAP.md)
- 🚀 [Guía de Despliegue](./docs/DEPLOYMENT.md)
- 💡 [Filosofía SEVI](./docs/SEVI_PHILOSOPHY.md)
- 🛠️ [Comandos Útiles](./docs/COMMANDS.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de Cloution. Todos los derechos reservados.

## 👥 Equipo

Desarrollado con ❤️ por el equipo de **Cloution** en Colombia 🇨🇴

### Contacto
- 🌐 Website: [cloution.com](https://cloution.com)
- 📧 Email: contacto@cloution.com
- 💼 LinkedIn: [Cloution](https://linkedin.com/company/cloution)

## 🙏 Agradecimientos

- React Team
- Vite Team
- Three.js Community
- Tailwind CSS Team
- Framer Motion Team
- Open Source Community

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0
