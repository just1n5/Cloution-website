# 🔧 Troubleshooting - Cloution Website

## 📋 Tabla de Contenidos
1. [Problemas Comunes](#problemas-comunes)
2. [Errores de Desarrollo](#errores-de-desarrollo)
3. [Problemas con 3D/Three.js](#problemas-con-3dthreejs)
4. [Errores de React Router](#errores-de-react-router)
5. [Problemas de Build](#problemas-de-build)
6. [Errores de Producción](#errores-de-producción)
7. [Performance Issues](#performance-issues)
8. [Comandos de Diagnóstico](#comandos-de-diagnóstico)

---

## 🔴 Problemas Comunes

### Problema: El proyecto no inicia

**Síntomas**:
- `npm run dev` falla
- Error de módulos no encontrados
- Puerto ocupado

**Soluciones**:
```bash
# 1. Limpiar e instalar dependencias
npm run clean
npm install

# 2. Si persiste, limpiar caché
npm cache clean --force
npm install

# 3. Puerto ocupado (cambiar puerto)
npm run dev -- --port 3001

# 4. Verificar versión de Node
node --version  # Debe ser 18+
```

---

### Problema: Página en blanco

**Síntomas**:
- La aplicación carga pero no muestra contenido
- Consola muestra errores de JavaScript

**Soluciones**:
```javascript
// 1. Verificar ErrorBoundary en App.jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>

// 2. Verificar index.html tiene el root
<div id="root"></div>

// 3. Verificar main.jsx monta correctamente
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### Problema: Estilos no se aplican

**Síntomas**:
- Tailwind classes no funcionan
- Página sin estilos

**Soluciones**:
```css
/* 1. Verificar index.css importa Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. Verificar main.jsx importa index.css */
import './index.css'

/* 3. Reiniciar servidor de desarrollo */
```

```javascript
// 4. Verificar tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

---

## 💻 Errores de Desarrollo

### Error: Cannot find module

**Síntomas**:
```
Module not found: Error: Can't resolve '@/components/Header'
```

**Soluciones**:
```javascript
// 1. Verificar alias en vite.config.js
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}

// 2. Usar rutas relativas si falla
import Header from '../components/Header'

// 3. Verificar mayúsculas/minúsculas
// Windows no es case-sensitive, Linux/Mac sí
```

---

### Error: Hooks Rules Violation

**Síntomas**:
```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component
```

**Soluciones**:
```javascript
// ❌ Incorrecto
if (condition) {
  const [state, setState] = useState()
}

// ✅ Correcto
const [state, setState] = useState()
if (condition) {
  setState(value)
}

// Verificar no hay duplicados de React
npm ls react
```

---

## 🎮 Problemas con 3D/Three.js

### Problema: Iconos 3D no se renderizan

**Síntomas**:
- Canvas vacío
- Error "WebGL not supported"
- Modelos no visibles

**Soluciones**:
```javascript
// 1. Verificar Canvas tiene dimensiones
<div style={{ width: '400px', height: '400px' }}>
  <Canvas>
    <Icon3D />
  </Canvas>
</div>

// 2. Agregar luces a la escena
<Canvas>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <Icon3D />
</Canvas>

// 3. Verificar WebGL soporte
const checkWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch(e) {
    return false
  }
}

if (!checkWebGL()) {
  return <div>Tu navegador no soporta WebGL</div>
}
```

---

### Problema: Performance bajo con 3D

**Síntomas**:
- FPS bajo (< 30fps)
- Lag en animaciones
- Calentamiento del dispositivo

**Soluciones**:
```javascript
// 1. Reducir calidad en móviles
const isMobile = window.innerWidth < 768
const quality = isMobile ? 'low' : 'high'

<Canvas
  dpr={isMobile ? 1 : [1, 2]}  // Pixel ratio
  shadows={!isMobile}            // Sin sombras en móvil
  performance={{ min: 0.5 }}    // Throttling automático
>

// 2. Optimizar geometrías
<sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />

// 3. Usar instancing para objetos repetidos
import { Instances, Instance } from '@react-three/drei'

<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {positions.map((pos, i) => (
    <Instance key={i} position={pos} />
  ))}
</Instances>

// 4. Implementar LOD (Level of Detail)
import { Lod } from '@react-three/drei'

<Lod>
  <mesh visible={false} distance={5}>
    {/* Alta calidad */}
  </mesh>
  <mesh visible={false} distance={15}>
    {/* Media calidad */}
  </mesh>
  <mesh visible={false} distance={30}>
    {/* Baja calidad */}
  </mesh>
</Lod>
```

---

### Problema: Modelos GLTF/GLB no cargan

**Síntomas**:
- Error al cargar modelo
- CORS errors
- Modelo invisible

**Soluciones**:
```javascript
// 1. Usar useGLTF correctamente
import { useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/models/logo.glb')
  return <primitive object={scene} />
}

// Precargar modelo
useGLTF.preload('/models/logo.glb')

// 2. Verificar ruta del modelo
// Los modelos deben estar en public/
public/
  models/
    logo.glb

// 3. CORS para CDN externo
// Agregar headers en el servidor CDN:
Access-Control-Allow-Origin: *

// 4. Verificar MIME types
// En servidor, configurar:
.glb -> model/gltf-binary
.gltf -> model/gltf+json
```

---

## 🔄 Errores de React Router

### Problema: 404 al recargar página

**Síntomas**:
- Funciona en desarrollo pero no en producción
- Error 404 en rutas como /portfolio

**Soluciones**:

**Netlify** - Crear `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - Crear `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Nginx**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

### Problema: Navegación no funciona

**Síntomas**:
- Links recargan la página completa
- Estado se pierde al navegar

**Soluciones**:
```javascript
// 1. Usar Link de React Router, no <a>
// ❌ Incorrecto
<a href="/portfolio">Portfolio</a>

// ✅ Correcto
import { Link } from 'react-router-dom'
<Link to="/portfolio">Portfolio</Link>

// 2. Verificar Router envuelve la app
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter>
  <App />
</BrowserRouter>

// 3. Para anclas en la misma página
const handleScrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
```

---

## 🏗️ Problemas de Build

### Error: Out of Memory

**Síntomas**:
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Soluciones**:
```bash
# 1. Aumentar memoria para Node
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# 2. En Windows
set NODE_OPTIONS=--max-old-space-size=4096
npm run build

# 3. En package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
}
```

---

### Error: Build Size Too Large

**Síntomas**:
- Warning sobre chunk size
- Build > 1MB

**Soluciones**:
```javascript
// 1. Configurar code splitting en vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          router: ['react-router-dom'],
        }
      }
    }
  }
}

// 2. Lazy loading de componentes
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const Icon3D = lazy(() => import('./icons/Icon3D'))

// 3. Analizar bundle
npm run build -- --report
```

---

## 🌐 Errores de Producción

### Problema: Variables de entorno no funcionan

**Síntomas**:
- `import.meta.env.VITE_API_URL` es undefined
- APIs no funcionan en producción

**Soluciones**:
```bash
# 1. Variables DEBEN empezar con VITE_
VITE_API_URL=https://api.cloution.com  # ✅
API_URL=https://api.cloution.com       # ❌

# 2. Crear .env.production
VITE_API_URL=https://api.cloution.com
VITE_PUBLIC_URL=https://cloution.com

# 3. En el hosting, configurar variables
# Vercel/Netlify: En dashboard del proyecto
# Docker: En docker-compose.yml o Dockerfile
```

---

### Problema: HTTPS/SSL Issues

**Síntomas**:
- Mixed content warnings
- Recursos no cargan en HTTPS

**Soluciones**:
```html
<!-- 1. Usar URLs relativas o HTTPS -->
<!-- ❌ -->
<script src="http://cdn.example.com/script.js"></script>

<!-- ✅ -->
<script src="https://cdn.example.com/script.js"></script>
<script src="//cdn.example.com/script.js"></script>

<!-- 2. Meta tag para upgrade -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

---

## ⚡ Performance Issues

### Problema: Initial Load Lento

**Síntomas**:
- LCP > 2.5s
- Pantalla blanca prolongada

**Soluciones**:
```javascript
// 1. Implementar skeleton loader
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
)

// 2. Preload crítico
<link rel="preload" href="/fonts/Inter.woff2" as="font" crossorigin>
<link rel="preload" href="/logo.svg" as="image">

// 3. Code splitting agresivo
const HeavyComponent = lazy(() => 
  import(/* webpackChunkName: "heavy" */ './HeavyComponent')
)
```

---

### Problema: Animaciones Lagueadas

**Síntomas**:
- Animaciones no smooth (< 60fps)
- Jank visible

**Soluciones**:
```css
/* 1. Usar transform en lugar de position */
/* ❌ */
.animate { left: 100px; }

/* ✅ */
.animate { transform: translateX(100px); }

/* 2. Will-change para optimización */
.will-animate {
  will-change: transform, opacity;
}

/* 3. GPU acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

```javascript
// 4. Debounce/throttle para eventos frecuentes
import { throttle } from 'lodash'

const handleScroll = throttle(() => {
  // Lógica de scroll
}, 16) // ~60fps
```

---

## 🔍 Comandos de Diagnóstico

### Verificar Instalación
```bash
# Versiones de herramientas
node --version          # Debe ser >= 18
npm --version          # Debe ser >= 9
npx vite --version

# Dependencias instaladas
npm ls
npm ls three           # Verificar versión de Three.js
npm ls react          # Verificar no hay duplicados

# Verificar scripts disponibles
npm run
```

### Análisis de Bundle
```bash
# Generar reporte de bundle
npm run build -- --report

# Analizar dependencias
npx vite-bundle-visualizer

# Ver tamaño de dependencias
npm ls --depth=0 --json | jq '.dependencies | to_entries | .[] | {name: .key, size: .value}'
```

### Debugging en Desarrollo
```bash
# Modo verbose
npm run dev -- --debug

# Con source maps
npm run dev -- --sourcemap

# Logs detallados
DEBUG=* npm run dev

# Inspección de Node
node --inspect-brk ./node_modules/.bin/vite
```

### Performance Profiling
```javascript
// En la consola del navegador
// 1. Performance profiling
performance.mark('myComponent-start')
// ... código ...
performance.mark('myComponent-end')
performance.measure('myComponent', 'myComponent-start', 'myComponent-end')

// 2. React DevTools Profiler
// Instalar extensión y usar Profiler tab

// 3. Three.js stats
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  stats.begin()
  // ... render ...
  stats.end()
  requestAnimationFrame(animate)
}
```

---

## 🆘 Cuando Todo Falla

### Reset Completo
```bash
# 1. Backup del código
cp -r src src-backup

# 2. Limpiar todo
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm package-lock.json
npm cache clean --force

# 3. Reinstalar
npm install

# 4. Verificar
npm run dev
```

### Crear Proyecto Nuevo y Migrar
```bash
# 1. Crear proyecto nuevo
npm create vite@latest cloution-fresh -- --template react

# 2. Instalar dependencias necesarias
cd cloution-fresh
npm install tailwindcss framer-motion three @react-three/fiber

# 3. Copiar src
cp -r ../Cloution_Website/src/* ./src/

# 4. Probar
npm run dev
```

---

## 📞 Soporte

Si ninguna solución funciona:

1. **Buscar en Issues de GitHub**:
   - [React Issues](https://github.com/facebook/react/issues)
   - [Vite Issues](https://github.com/vitejs/vite/issues)
   - [Three.js Issues](https://github.com/mrdoob/three.js/issues)

2. **Comunidad**:
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/react+vite)
   - [Discord de Vite](https://discord.gg/vite)
   - [Discord de Three.js](https://discord.gg/three-js)

3. **Contacto Directo**:
   - 📧 support@cloution.com
   - 💬 Slack interno: #tech-support

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0  
**Filosofía**: SEVI - Resolución rápida y efectiva
