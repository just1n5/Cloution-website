# 🛠️ Scripts y Comandos Útiles - Cloution Website

## 📋 Tabla de Contenidos
1. [Comandos NPM](#comandos-npm)
2. [Scripts de Windows](#scripts-de-windows)
3. [Scripts Unix/Linux](#scripts-unixlinux)
4. [Git Commands](#git-commands)
5. [Comandos de Desarrollo](#comandos-de-desarrollo)
6. [Mantenimiento y Debugging](#mantenimiento-y-debugging)
7. [Testing y Verificación](#testing-y-verificación)
8. [Optimización](#optimización)

---

## 📦 Comandos NPM

### Scripts Disponibles en package.json
```json
{
  "scripts": {
    "dev": "vite --host --open",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "clean": "rimraf node_modules dist",
    "reinstall": "npm run clean && npm install",
    "start": "vite --host --open",
    "dev:debug": "vite --debug --host",
    "fix": "npm cache clean --force && npm install --force"
  }
}
```

### Comandos de Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar servidor con modo debug
npm run dev:debug

# Iniciar servidor (alias)
npm start

# Servidor en puerto específico
npm run dev -- --port 4000

# Servidor sin abrir navegador
npm run dev -- --no-open
```

### Build y Preview
```bash
# Crear build de producción
npm run build

# Preview del build de producción
npm run preview

# Build con análisis del bundle
npm run build -- --report

# Build con source maps
npm run build -- --sourcemap
```

### Linting y Formateo
```bash
# Ejecutar ESLint
npm run lint

# Corregir errores de ESLint automáticamente
npm run lint -- --fix

# Formatear código con Prettier (si está configurado)
npx prettier --write "src/**/*.{js,jsx,css}"
```

### Limpieza y Reinstalación
```bash
# Limpiar node_modules y dist
npm run clean

# Reinstalar todas las dependencias
npm run reinstall

# Reparar instalación (limpia caché y fuerza instalación)
npm run fix
```

---

## 🪟 Scripts de Windows

### Scripts .bat Disponibles

#### RUN.bat
```batch
@echo off
echo ========================================
echo    INICIANDO CLOUTION WEBSITE
echo ========================================
npm run dev
```
**Uso**: Inicio rápido del proyecto en desarrollo

#### start.bat
```batch
@echo off
cd /d "C:\Users\justi\Desktop\Cloution_Website"
npm start
```
**Uso**: Script alternativo de inicio con ruta absoluta

#### TEST_HERO_V2.bat
```batch
@echo off
echo Testing Hero Component V2...
npm run dev -- --open /test/hero-v2
```
**Uso**: Prueba del componente Hero versión 2

#### TEST_LOGO.bat
```batch
@echo off
echo Testing 3D Logos...
node debug-icons.js
```
**Uso**: Verificación de logos 3D animados

#### TEST_SEVI.bat
```batch
@echo off
echo Testing SEVI Philosophy Implementation...
npm run dev -- --open /#filosofia
```
**Uso**: Test del sistema SEVI (Seguridad, Escalabilidad, Velocidad, Innovación)

#### VERIFY_ALL_LOGOS.bat
```batch
@echo off
echo Verifying all 3D logos and icons...
for %%f in (src/icons/*.jsx) do (
    echo Checking %%f...
    node -c %%f
)
```
**Uso**: Verificación de sintaxis de todos los logos/iconos

### Ejecución de Scripts .bat
```batch
# Ejecutar desde el directorio del proyecto
.\RUN.bat

# Ejecutar desde cualquier ubicación
C:\Users\justi\Desktop\Cloution_Website\RUN.bat

# Ejecutar con PowerShell
powershell -ExecutionPolicy Bypass -File install.ps1
```

---

## 🐧 Scripts Unix/Linux

### install.sh
```bash
#!/bin/bash
echo "========================================="
echo "   INSTALANDO CLOUTION WEBSITE"
echo "========================================="
npm install
echo "Instalación completada!"
```

### Permisos y Ejecución
```bash
# Dar permisos de ejecución
chmod +x install.sh

# Ejecutar script
./install.sh

# Script de inicio para Unix
#!/bin/bash
npm run dev -- --host 0.0.0.0
```

---

## 📝 Git Commands

### Comandos Git Esenciales
```bash
# Inicializar repositorio
git init

# Estado del repositorio
git status

# Agregar archivos
git add .
git add src/components/NewComponent.jsx

# Commit con mensaje
git commit -m "feat: Add 3D icons system with SEVI philosophy"

# Push al repositorio remoto
git push origin main

# Pull últimos cambios
git pull origin main
```

### Branching Strategy
```bash
# Crear nueva rama para feature
git checkout -b feature/3d-icons

# Crear rama para hotfix
git checkout -b hotfix/routing-issue

# Cambiar entre ramas
git checkout main
git checkout develop

# Merge de rama
git checkout main
git merge feature/3d-icons

# Eliminar rama local
git branch -d feature/3d-icons
```

### Convenciones de Commit
```bash
# Formato: <tipo>: <descripción>

# Tipos comunes:
git commit -m "feat: Add portfolio page with filtering"
git commit -m "fix: Resolve routing issue in production"
git commit -m "docs: Update ARCHITECTURE.md with 3D system"
git commit -m "style: Format code with prettier"
git commit -m "refactor: Optimize 3D icon rendering"
git commit -m "test: Add unit tests for router"
git commit -m "chore: Update dependencies"
```

---

## 💻 Comandos de Desarrollo

### Instalación de Dependencias
```bash
# Instalar todas las dependencias
npm install

# Instalar dependencia de producción
npm install framer-motion

# Instalar dependencia de desarrollo
npm install -D @types/three

# Instalar versión específica
npm install react@18.3.1

# Instalar desde package-lock.json (más rápido y consistente)
npm ci
```

### Gestión de Dependencias 3D
```bash
# Instalar stack 3D completo
npm install three @react-three/fiber @react-three/drei postprocessing

# Actualizar dependencias 3D
npm update three @react-three/fiber

# Verificar versiones instaladas
npm ls three
```

### Variables de Entorno
```bash
# Crear archivo de variables de entorno
cp .env.example .env.local

# Variables para desarrollo
echo "VITE_API_URL=http://localhost:3000" >> .env.local
echo "VITE_ENABLE_3D=true" >> .env.local
echo "VITE_DEBUG_MODE=true" >> .env.local

# Variables para producción
echo "VITE_API_URL=https://api.cloution.com" >> .env.production
echo "VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X" >> .env.production
```

---

## 🔧 Mantenimiento y Debugging

### Limpiar Caché
```bash
# Limpiar caché de npm
npm cache clean --force

# Limpiar caché de Vite
rm -rf node_modules/.vite

# Limpiar todo y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Verificar Dependencias
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias (con cuidado)
npm update

# Actualizar una dependencia específica
npm update react-router-dom

# Auditar vulnerabilidades
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix

# Forzar corrección (puede romper compatibilidad)
npm audit fix --force
```

### Debugging
```bash
# Iniciar con más información de debug
npm run dev:debug

# Ver logs detallados de Vite
VITE_LOG_LEVEL=debug npm run dev

# Inspeccionar bundle
npm run build -- --report

# Analizar tamaño de dependencias
npx vite-bundle-visualizer
```

---

## 🧪 Testing y Verificación

### Verificación de Componentes
```bash
# Verificar sintaxis de todos los archivos JSX
npx eslint src/**/*.jsx

# Verificar solo componentes
npx eslint src/components/**/*.jsx

# Verificar iconos 3D
npx eslint src/icons/**/*.jsx

# Type checking (si tienes TypeScript)
npx tsc --noEmit
```

### Testing de Performance
```bash
# Lighthouse CI
npx lighthouse https://localhost:5173

# Medir bundle size
npx bundlesize

# Analizar tiempo de carga
npx web-vitals
```

### Testing de Iconos 3D
```bash
# Script personalizado para verificar iconos
node -e "
  const fs = require('fs');
  const icons = fs.readdirSync('./src/icons');
  icons.forEach(icon => {
    console.log('✓ ' + icon);
  });
"
```

---

## ⚡ Optimización

### Optimización de Build
```bash
# Build con compresión
npm run build -- --minify terser

# Build sin source maps (más pequeño)
npm run build -- --sourcemap false

# Build con análisis
npm run build -- --report
```

### Optimización de Assets
```bash
# Comprimir imágenes (necesita imagemin instalado)
npx imagemin public/images/* --out-dir=public/images/optimized

# Convertir a WebP
npx imagemin public/images/*.{jpg,png} --plugin=imagemin-webp --out-dir=public/images/webp

# Optimizar SVGs
npx svgo public/*.svg
```

### Optimización de Dependencias
```bash
# Encontrar dependencias duplicadas
npx npm-dedupe

# Analizar qué está usando cada dependencia
npx depcheck

# Remover dependencias no utilizadas
npm prune
```

---

## 📊 Scripts Útiles Adicionales

### Crear Componente Rápido
```bash
# Script para crear componente boilerplate
echo "import React from 'react'

const ComponentName = () => {
  return (
    <div>
      ComponentName
    </div>
  )
}

export default ComponentName" > src/components/ComponentName.jsx
```

### Backup Rápido
```bash
# Windows
xcopy /E /I /Y src backup\src_%date:~-4,4%%date:~-10,2%%date:~-7,2%

# Unix/Linux
cp -r src backup/src_$(date +%Y%m%d)
```

### Servidor de Producción Local
```bash
# Servir build de producción
npx serve -s dist -p 3000

# Con http-server
npx http-server dist -p 3000 -c-1
```

---

## 🎯 Comandos Alias Sugeridos

### Agregar a package.json
```json
{
  "scripts": {
    "dev": "vite --host --open",
    "dev:mobile": "vite --host 0.0.0.0",
    "dev:debug": "vite --debug --host",
    "build": "vite build",
    "build:analyze": "vite build --report",
    "preview": "vite preview",
    "clean": "rimraf node_modules dist",
    "clean:cache": "rimraf node_modules/.vite",
    "reinstall": "npm run clean && npm install",
    "fix": "npm cache clean --force && npm install --force",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test:icons": "node debug-icons.js",
    "verify:3d": "eslint src/icons/**/*.jsx",
    "update:check": "npm outdated",
    "security:check": "npm audit"
  }
}
```

---

## 🚀 Quick Commands Cheatsheet

```bash
# Desarrollo
npm run dev              # Iniciar desarrollo
npm run dev:mobile       # Desarrollo accesible en red
npm run dev:debug        # Modo debug

# Build
npm run build           # Build producción
npm run preview         # Preview del build

# Mantenimiento
npm run clean           # Limpiar proyecto
npm run reinstall       # Reinstalar deps
npm run fix            # Reparar proyecto

# Testing
npm run lint           # Verificar código
npm run test:icons     # Test iconos 3D
npm run verify:3d      # Verificar 3D

# Git
git add .              # Agregar cambios
git commit -m "msg"    # Commit
git push              # Push cambios
```

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.1.0  
**Mantenido por**: Equipo de Desarrollo Cloution
