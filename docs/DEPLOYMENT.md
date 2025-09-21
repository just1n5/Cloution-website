# 🚀 Guía de Despliegue - Cloution Website

## 📋 Tabla de Contenidos
1. [Pre-requisitos](#pre-requisitos)
2. [Consideraciones Importantes](#consideraciones-importantes)
3. [Opciones de Despliegue](#opciones-de-despliegue)
4. [Optimizaciones para Producción](#optimizaciones-para-producción)
5. [Configuración de Seguridad](#configuración-de-seguridad)
6. [Monitoreo y Analytics](#monitoreo-y-analytics)
7. [Troubleshooting](#troubleshooting)
8. [Checklist de Despliegue](#checklist-de-despliegue)

---

## 📋 Pre-requisitos

- **Node.js 18+** instalado
- **NPM 9+** o Yarn
- **Git** configurado
- Cuenta en el servicio de hosting (Vercel, Netlify, AWS, etc.)
- **Mínimo 4GB RAM** para build (por Three.js y dependencias 3D)
- **Espacio en disco**: ~500MB para dependencias

---

## ⚠️ Consideraciones Importantes

### 1. React Router DOM
Al ser una SPA con React Router, es **CRÍTICO** configurar el servidor para redirigir todas las rutas al `index.html`. Sin esta configuración, las rutas como `/portfolio` o `/case-study/:id` darán error 404 al recargar la página.

### 2. Assets 3D y Three.js
```javascript
// Consideraciones de bundle size
- Three.js: ~600KB gzipped
- React Three Fiber: ~40KB gzipped
- Drei: ~200KB gzipped
- Total 3D stack: ~850KB gzipped
```

**Optimizaciones recomendadas**:
- Implementar code splitting para componentes 3D
- Usar CDN para modelos y texturas pesadas
- Comprimir geometrías y texturas
- Lazy loading de Canvas 3D

### 3. Variables de Entorno
```bash
# .env.production
VITE_API_URL=https://api.cloution.com
VITE_ENABLE_3D=true
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
VITE_PUBLIC_URL=https://cloution.com
```

### 4. Build Configuration
```javascript
// vite.config.js optimizado para producción
export default {
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/gltf|glb|hdr|exr/i.test(ext)) {
            return `assets/3d/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
}
```

---

## 🚀 Opciones de Despliegue

### Opción 1: Vercel (⭐ Recomendado para React + Three.js)

#### Ventajas:
- ✅ Configuración automática para React Router
- ✅ CDN global incluido
- ✅ Preview deployments automáticos
- ✅ Excelente para Next.js migration path

#### Setup:

1. **Instalar Vercel CLI**:
```bash
npm i -g vercel
```

2. **Desplegar**:
```bash
vercel
```

3. **Configuración (vercel.json)**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/models/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}
```

---

### Opción 2: Netlify

#### Ventajas:
- ✅ Forms handling incluido
- ✅ Funciones serverless
- ✅ Split testing A/B
- ✅ Rollbacks instantáneos

#### Setup:

1. **Build local**:
```bash
npm run build
```

2. **Deploy con CLI**:
```bash
npm i -g netlify-cli
netlify deploy --dir=dist
netlify deploy --prod --dir=dist
```

3. **Configuración (_redirects en public/)**:
```
# SPA Support
/*    /index.html   200

# API Proxy (opcional)
/api/*  https://api.cloution.com/:splat  200
```

4. **Configuración (netlify.toml)**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[plugins]]
  package = "@netlify/plugin-lighthouse"
  [plugins.inputs]
    performance = 0.9
```

---

### Opción 3: AWS S3 + CloudFront

#### Ventajas:
- ✅ Escalabilidad empresarial
- ✅ Control total sobre CDN
- ✅ Costos bajos para alto tráfico
- ✅ Integración con otros servicios AWS

#### Setup:

1. **Build del proyecto**:
```bash
npm run build
```

2. **Subir a S3**:
```bash
aws s3 sync dist/ s3://cloution-website --delete
```

3. **Configurar S3 para hosting**:
```json
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "index.html"
  },
  "RoutingRules": [
    {
      "Condition": {
        "HttpErrorCodeReturnedEquals": "404"
      },
      "Redirect": {
        "ReplaceKeyWith": "index.html"
      }
    }
  ]
}
```

4. **CloudFront Distribution**:
```json
{
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html",
      "ErrorCachingMinTTL": 0
    },
    {
      "ErrorCode": 403,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html",
      "ErrorCachingMinTTL": 0
    }
  ],
  "DefaultCacheBehavior": {
    "Compress": true,
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

---

### Opción 4: Docker + Nginx

#### Ventajas:
- ✅ Portabilidad total
- ✅ Control completo del servidor
- ✅ Ideal para on-premise
- ✅ Fácil replicación de entorno

#### Dockerfile:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon model/gltf-binary model/gltf+json;

    # Configuración para React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache para modelos 3D
    location ~* \.(gltf|glb|hdr|exr|ktx|ktx2)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Headers de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

#### Deploy:
```bash
docker build -t cloution-website .
docker run -d -p 80:80 --name cloution cloution-website
```

---

## ⚡ Optimizaciones para Producción

### 1. Compresión de Assets
```bash
npm install --save-dev vite-plugin-compression
```

```javascript
// vite.config.js
import viteCompression from 'vite-plugin-compression'

export default {
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
}
```

### 2. Optimización de Imágenes
```bash
npm install --save-dev vite-plugin-imagemin
```

```javascript
import imagemin from 'vite-plugin-imagemin'

export default {
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
}
```

### 3. PWA Support
```bash
npm install --save-dev vite-plugin-pwa
```

```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Cloution - SEVI Technology',
        short_name: 'Cloution',
        theme_color: '#1e1b4b',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
}
```

### 4. Lazy Loading de Componentes 3D
```javascript
// Lazy load de iconos 3D
const FrontendIcon3D = lazy(() => 
  import(/* webpackChunkName: "3d-frontend" */ './icons/FrontendIcon3D')
)

// Uso con Suspense
<Suspense fallback={<div>Cargando modelo 3D...</div>}>
  <Canvas>
    <FrontendIcon3D />
  </Canvas>
</Suspense>
```

### 5. CDN para Assets Pesados
```javascript
// Configurar CDN para modelos 3D
const CDN_URL = import.meta.env.VITE_CDN_URL || 'https://cdn.cloution.com'

// Cargar modelos desde CDN
const { scene } = useGLTF(`${CDN_URL}/models/logo.glb`)
```

---

## 🔒 Configuración de Seguridad

### Headers de Seguridad

#### Netlify (_headers en public/)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.cloution.com
```

#### Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### SSL/TLS
- Forzar HTTPS en todos los entornos
- Usar certificados SSL válidos (Let's Encrypt o proveedor)
- HSTS header para forzar HTTPS:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

## 📈 Monitoreo y Analytics

### 1. Google Analytics
```javascript
// En index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

### 2. Sentry para Error Tracking
```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 3. Web Vitals
```javascript
// Monitorear Core Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

---

## 🐛 Troubleshooting

### Problema: 404 en rutas al recargar
**Solución**: Asegurarse de que el servidor esté configurado para SPA routing

### Problema: Modelos 3D no cargan
**Solución**: 
```javascript
// Verificar CORS headers para CDN
Access-Control-Allow-Origin: *

// Verificar MIME types
model/gltf-binary .glb
model/gltf+json .gltf
```

### Problema: Build falla por memoria
**Solución**:
```bash
# Aumentar memoria de Node
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Problema: Bundle size muy grande
**Solución**:
```bash
# Analizar bundle
npm run build -- --report

# Implementar dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

---

## ✅ Checklist de Despliegue

### Pre-Despliegue
- [ ] Build local exitoso (`npm run build`)
- [ ] Sin errores de ESLint (`npm run lint`)
- [ ] Variables de entorno configuradas
- [ ] Assets optimizados (imágenes, 3D)
- [ ] Pruebas en navegadores principales
- [ ] Responsive verificado
- [ ] SEO meta tags actualizados
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado

### Durante Despliegue
- [ ] Backup del deployment anterior
- [ ] Deploy a staging/preview primero
- [ ] Verificar todas las rutas funcionan
- [ ] Verificar assets 3D cargan
- [ ] SSL/HTTPS activo
- [ ] Headers de seguridad configurados

### Post-Despliegue
- [ ] Todas las páginas cargan (/, /portfolio, /case-study)
- [ ] React Router funciona al recargar
- [ ] Iconos 3D se renderizan correctamente
- [ ] Animaciones funcionan suavemente
- [ ] Formularios envían correctamente
- [ ] Analytics está registrando
- [ ] No hay errores en consola
- [ ] Performance > 90 en Lighthouse
- [ ] Monitoreo activo (Sentry, Analytics)

### Herramientas de Verificación
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)**: Performance y SEO
- **[GTmetrix](https://gtmetrix.com)**: Velocidad de carga
- **[Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)**: Responsive
- **[W3C Validator](https://validator.w3.org)**: HTML válido
- **[SSL Labs](https://www.ssllabs.com/ssltest/)**: Seguridad SSL
- **[SecurityHeaders.com](https://securityheaders.com)**: Headers de seguridad
- **[WebPageTest](https://www.webpagetest.org)**: Performance detallado

---

## 🆘 Soporte

### Recursos de Ayuda
- 📧 Email: devops@cloution.com
- 💬 Slack: #deployment-help
- 📚 Docs: https://docs.cloution.com/deployment
- 🐛 Issues: https://github.com/cloution/website/issues

### Comandos de Emergencia
```bash
# Rollback en Vercel
vercel rollback

# Rollback en Netlify
netlify deploy --prod --dir=dist-backup

# Logs en tiempo real
vercel logs --follow
netlify functions:log --tail
```

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0  
**Filosofía**: SEVI - Seguridad, Escalabilidad, Velocidad, Innovación
