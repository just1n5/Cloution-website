@echo off
taskkill /f /im node.exe >nul 2>&1
if exist "src\App.original.jsx" copy "src\App.original.jsx" "src\App.jsx" >nul
if exist "vite.config.original.js" copy "vite.config.original.js" "vite.config.js" >nul
if exist "src\components\ParticleBackground.original.jsx" copy "src\components\ParticleBackground.original.jsx" "src\components\ParticleBackground.jsx" >nul
del optimization_status.txt 2>nul
rmdir /s /q node_modules\.vite 2>nul
rmdir /s /q dist 2>nul
npm run build
npm run preview
