# Guía de Optimización de Performance - Cloution Website

## Diagnóstico de Problemas Identificados

### Problemas críticos
1. **ParticleBackground**: más de 100 partículas con cálculos O(n²).
2. **Iconos 3D**: Three.js renderizando de forma continua.
3. **Sin lazy loading**: todo se carga en el primer paint.
4. **Loader artificial**: retardo fijo de 2 segundos innecesario.
5. **Sin caché**: los recursos se descargan en cada visita.
6. **Animaciones pesadas**: Framer Motion ejecutándose siempre.

## ✅ Soluciones Implementadas

### 1. ParticleBackground optimizado
`javascript
// Antes: 100 partículas, conexiones O(n²)
// Ahora: 20-50 partículas según el dispositivo, sin conexiones en móvil
`

**Mejoras clave**
- Detección automática de la capacidad del dispositivo.
- 20 partículas en móvil sin conexiones.
- 50 partículas en desktop con conexiones limitadas.
- FPS máximo de 30 en móvil y 60 en desktop.
- Pausa automática cuando la pestaña no está visible.
- Respeto de la preferencia prefers-reduced-motion.

### 2. Sistema de iconos inteligente (SmartIcon)
`javascript
// Selecciona automáticamente entre iconos 3D y 2D
<SmartIcon type="frontend" />
`

**Características**
- Iconos 3D solo en desktop con buena performance.
- Fallback a iconos SVG en móviles o dispositivos lentos.
- Lazy loading con Intersection Observer.
- Caché y precarga de recursos 3D.

### 3. Lazy loading agresivo
`javascript
// Carga progresiva de secciones según el desplazamiento
const About = lazy(() => import('./components/About'))
`

**Implementación**
- Hero se carga inmediatamente.
- Secciones posteriores se cargan al alcanzar umbrales (20 %, 35 %, 50 %, etc.).
- Límites de Suspense con fallbacks ligeros.
- Preload de recursos críticos para evitar parpadeos.

### 4. Service Worker para caché avanzada
`javascript
// Estrategias de caché específicas por tipo de recurso
- Imágenes: Cache First (largo plazo)
- JS/CSS: Stale While Revalidate
- HTML: Network First
- Fuentes: Cache First (muy largo plazo)
`

### 5. Configuración de Vite optimizada
`javascript
// Code splitting inteligente
- react-vendor: núcleo de React
- three-vendor: Three.js (solo si se usa)
- animation-vendor: Framer Motion
- components: componentes comunes
- components-3d: componentes 3D
`

## Cómo aplicar las optimizaciones

### Paso 1. Crear copia de seguridad
`ash
# Windows
xcopy /E /I /Y src backup\src_%date%
xcopy /E /I /Y package.json backup\package_%date%.json
xcopy /E /I /Y vite.config.js backup\vite.config_%date%.js

# macOS/Linux
cp -r src backup/src_
cp package.json backup/package_.json
cp vite.config.js backup/vite.config_.js
`

### Paso 2. Aplicar cambios controlados

#### 2.1 Actualizar App.jsx
`ash
cp src/App.jsx src/App.original.jsx
cp src/AppOptimized.jsx src/App.jsx
`

#### 2.2 Sustituir ParticleBackground
`ash
cp src/components/ParticleBackground.jsx src/components/ParticleBackground.original.jsx
cp src/components/ParticleBackgroundOptimized.jsx src/components/ParticleBackground.jsx
`

#### 2.3 Ajustar ite.config.js
`ash
cp vite.config.js vite.config.original.js
cp vite.config.optimized.js vite.config.js
`

#### 2.4 Registrar el service worker
Agregar en public/index.html antes de </body>:
`html
<script>
  if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch((error) => console.error('Fallo al registrar Service Worker', error));
    });
  }
</script>
`

## Optimizaciones específicas para móviles

### Detectadas automáticamente
- ✅ Menos partículas (20 vs 100).
- ✅ Sin conexiones entre partículas.
- ✅ FPS limitado a 30.
- ✅ Iconos 2D en lugar de 3D.
- ✅ Sin orbes animados de fondo.
- ✅ Animaciones de Framer Motion desactivadas.

### Configuración manual de respaldo
`javascript
// performance.js
particles: {
  mobile: {
    count: 20,
    connectionDistance: 0,
    animationSpeed: 0.1,
  },
}
`

## Caché y persistencia

### LocalStorage para caché de datos
`javascript
// Guardar en caché
CacheManager.set('key', data, duration)

// Recuperar de caché
const cached = CacheManager.get('key')

// Limpiar caché
CacheManager.clear()
`

### Service Worker para assets
- Imágenes: caché por 30 días.
- Fuentes: caché por 1 año.
- CSS/JS: actualización en segundo plano.
- HTML: siempre desde red con fallback caché.

## Métricas de mejora esperadas

| Métrica | Antes | Después | Mejora |
| --- | --- | --- | --- |
| **FCP** | ~3.5 s | ~1.2 s | 65 % |
| **LCP** | ~5.2 s | ~2.1 s | 60 % |
| **TTI** | ~7.8 s | ~3.5 s | 55 % |
| **Bundle total** | ~2.5 MB | ~800 kB | 68 % |
| **FPS móvil** | 15-20 fps | 50-60 fps | +200 % |
| **Uso de CPU móvil** | 80-90 % | 20-30 % | -66 % |

## Testing de performance

### Herramientas sugeridas
1. Lighthouse (Chrome DevTools).
2. WebPageTest.org.
3. GTmetrix.
4. Chrome DevTools Performance Tab.

### Comandos base
`ash
# Build de producción
npm run build

# Analizar el bundle
npm run build -- --analyze

# Servir el build
npm run preview

# Auditar con Lighthouse CLI
npx lighthouse http://localhost:4173
`

## Checklist de optimización

- [ ] Backup del proyecto original.
- [ ] Reemplazar App.jsx por la versión optimizada.
- [ ] Actualizar ParticleBackground.
- [ ] Ajustar ite.config.js.
- [ ] Registrar el Service Worker en index.html.
- [ ] Migrar componentes para usar SmartIcon.
- [ ] Ejecutar 
pm run build.
- [ ] Ejecutar 
pm run preview y auditar con Lighthouse.
- [ ] Probar en dispositivos reales.
- [ ] Monitorear métricas post-deploy.

## Troubleshooting

### Si algo falla
1. Restaurar desde la copia de seguridad.
2. Revisar la consola del navegador para detectar errores.
3. Desactivar temporalmente el Service Worker.
4. Reducir aún más las partículas en performance.js.

### Rollback completo
`ash
cp src/App.original.jsx src/App.jsx
cp src/components/ParticleBackground.original.jsx src/components/ParticleBackground.jsx
cp vite.config.original.js vite.config.js
npm run clean
npm install
npm run dev
`

## Soporte

1. Revisa los logs del navegador y de la consola.
2. Confirma que no haya recursos bloqueados en la pestaña Network.
3. Comprueba que las rutas de importación sean correctas.
4. Verifica que sw.js se actualice tras cada deploy.

---

**Última actualización:** diciembre 2024  
**Versión:** 2.0.0-optimized  
**Mejora estimada:** 60-70 % más rápido en promedio
