# 🚀 Guía de Despliegue a Firebase Hosting

## 📋 Checklist Pre-Deploy

### Requisitos
- [ ] Node.js instalado
- [ ] Cuenta de Google/Firebase
- [ ] Proyecto creado en [Firebase Console](https://console.firebase.google.com)

### Verificaciones del Proyecto
- [ ] Build sin errores: `npm run build`
- [ ] Service Worker funcional
- [ ] PWA manifest configurado
- [ ] Iconos generados
- [ ] Lazy loading implementado

## 🔧 Instalación Inicial

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Iniciar Sesión
```bash
firebase login
```

### 3. Inicializar Proyecto
```bash
firebase init hosting
```

Seleccionar:
- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **GitHub Actions**: `No` (por ahora)
- **Overwrite index.html**: `No`

## 📦 Scripts de Deploy

### Deploy Completo (Recomendado)
```bash
# Script automatizado con todas las verificaciones
.\DEPLOY_TO_FIREBASE.bat
```

### Preview/Staging
```bash
# Crear un preview temporal (7 días)
.\PREVIEW_DEPLOY.bat
```

### Deploy Manual
```bash
# 1. Build
npm run build

# 2. Copiar archivos PWA
copy public\service-worker.js dist\
copy public\manifest.json dist\
xcopy public\icons dist\icons\ /E /I /Y

# 3. Deploy
firebase deploy --only hosting
```

## 🎯 Configuración de Firebase

### firebase.json (Ya configurado)
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      // Headers optimizados para PWA y performance
    ]
  }
}
```

## 🌐 URLs de Firebase

### Producción
```
https://[tu-proyecto].web.app
https://[tu-proyecto].firebaseapp.com
```

### Preview Channels
```
https://[tu-proyecto]--preview-[id].web.app
```

## ✅ Verificación Post-Deploy

### 1. PWA Check
- [ ] Service Worker activo
- [ ] Instalable desde navegador
- [ ] Funciona offline
- [ ] Manifest detectado

### 2. Performance Check
- [ ] Lazy loading funcional
- [ ] Recursos cacheados
- [ ] HTTPS activo
- [ ] HTTP/2 habilitado

### 3. Lighthouse Audit
```
1. Abrir sitio desplegado
2. F12 → Lighthouse
3. Ejecutar auditoría PWA
4. Score objetivo: 90+
```

## 📊 Monitoreo

### Firebase Console
- **Analytics**: Usuarios y eventos
- **Performance**: Métricas de carga
- **Hosting**: Uso de bandwidth

### Chrome DevTools
- **Application**: Service Worker status
- **Network**: Cache hits
- **Lighthouse**: PWA score

## 🔄 Actualizaciones

### Deploy Nueva Versión
```bash
# 1. Incrementar versión en service-worker.js
CACHE_VERSION = 'cloution-v2.1.0'

# 2. Build y deploy
npm run build
firebase deploy --only hosting
```

### Rollback
```bash
# Ver versiones anteriores
firebase hosting:releases:list

# Rollback a versión anterior
firebase hosting:rollback
```

## 🚨 Troubleshooting

### Service Worker no se registra
```javascript
// Verificar HTTPS
console.log(location.protocol) // debe ser https:
```

### PWA no instalable
- Verificar manifest.json
- Verificar HTTPS
- Verificar iconos

### Cache no se actualiza
- Incrementar CACHE_VERSION
- Limpiar cache del navegador

## 📈 Optimizaciones Firebase

### 1. Configurar Cache Headers
✅ Ya configurado en firebase.json:
- Service Worker: no-cache
- Assets: 1 año cache
- HTML: no-cache

### 2. Habilitar CDN
Firebase Hosting incluye CDN global automático

### 3. Compression
Firebase aplica gzip/brotli automáticamente

## 🎉 Features en Firebase

Con el deploy obtienes:
- ✅ **HTTPS automático**
- ✅ **CDN global**
- ✅ **HTTP/2**
- ✅ **SSL certificates**
- ✅ **DDoS protection**
- ✅ **Analytics integrado**
- ✅ **Preview channels**
- ✅ **Rollback fácil**

## 📝 Comandos Útiles

```bash
# Ver proyecto actual
firebase projects:list

# Ver deploys anteriores
firebase hosting:releases:list

# Crear preview temporal
firebase hosting:channel:deploy preview-test --expires 7d

# Ver uso de hosting
firebase hosting:usage

# Abrir consola
firebase open

# Ver logs
firebase functions:log
```

## 🔗 Enlaces Importantes

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [PWA en Firebase](https://firebase.google.com/docs/hosting/pwa)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## 💡 Tips Pro

1. **Preview antes de producción**: Siempre usa preview channels
2. **Versionado**: Mantén CACHE_VERSION actualizado
3. **Monitoreo**: Revisa Analytics regularmente
4. **Performance**: Usa Lighthouse después de cada deploy
5. **Rollback rápido**: Guarda el ID de releases exitosos

---

**Última actualización**: Diciembre 2024  
**Estado**: ✅ Listo para Deploy
