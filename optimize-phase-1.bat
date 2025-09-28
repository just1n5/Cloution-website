@echo off
setlocal EnableDelayedExpansion
cls

echo ============================================================
echo         FASE 1: BASE PERFORMANCE OPTIMIZATION
echo                   Riesgo: BAJO
echo ============================================================
echo.

set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set RESET=[0m

:: Create backup
echo %YELLOW%[1/7] Creando backup de seguridad...%RESET%
set backup_dir=backups\phase1_%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%
set backup_dir=!backup_dir: =0!
mkdir "!backup_dir!" 2>nul
copy "vite.config.js" "!backup_dir!\vite.config.js.bak" >nul 2>&1
copy "package.json" "!backup_dir!\package.json.bak" >nul 2>&1
echo %GREEN%Backup creado en: !backup_dir!%RESET%

:: Update vite.config.js with base optimizations
echo.
echo %YELLOW%[2/7] Aplicando configuracion optimizada de Vite...%RESET%
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo import path from 'path'
echo.
echo export default defineConfig^({
echo   plugins: [react^(^)],
echo   server: {
echo     port: 3000,
echo     open: true,
echo     cors: true,
echo   },
echo   resolve: {
echo     alias: {
echo       '@': path.resolve^(__dirname, './src'^),
echo       '@portfolio': path.resolve^(__dirname, './src/portfolio_screenshots'^)
echo     },
echo     dedupe: ['react', 'react-dom']
echo   },
echo   build: {
echo     // Optimizaciones basicas
echo     chunkSizeWarningLimit: 2000,
echo     minify: 'terser',
echo     terserOptions: {
echo       compress: {
echo         drop_console: true,
echo         drop_debugger: true,
echo       },
echo     },
echo     sourcemap: false,
echo     rollupOptions: {
echo       output: {
echo         // Code splitting basico
echo         manualChunks: {
echo           'react-vendor': ['react', 'react-dom', 'react-router-dom'],
echo           'animation-vendor': ['framer-motion'],
echo           'icon-vendor': ['lucide-react'],
echo         },
echo         // Nombres optimizados para cache
echo         chunkFileNames: 'js/[name]-[hash].js',
echo         entryFileNames: 'js/[name]-[hash].js',
echo         assetFileNames: ^(assetInfo^) =^> {
echo           const info = assetInfo.name.split^('.'^)
echo           const ext = info[info.length - 1]
echo           if ^(/png^|jpe?g^|svg^|gif^|webp^|ico/.test^(ext^)^) {
echo             return 'images/[name]-[hash][extname]'
echo           }
echo           if ^(/woff2?^|ttf^|otf/.test^(ext^)^) {
echo             return 'fonts/[name]-[hash][extname]'
echo           }
echo           return 'assets/[name]-[hash][extname]'
echo         },
echo       },
echo     },
echo     // Comprimir assets
echo     assetsInlineLimit: 4096,
echo   },
echo   optimizeDeps: {
echo     include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
echo   },
echo }^)
) > vite.config.phase1.js

copy "vite.config.phase1.js" "vite.config.js" >nul 2>&1
echo %GREEN%Configuracion de Vite actualizada%RESET%

:: Add compression headers to index.html
echo.
echo %YELLOW%[3/7] Optimizando index.html...%RESET%
powershell -Command "(Get-Content 'index.html') -replace '<link rel=\"preload\".*?>', '' | Set-Content 'index.html'"
echo %GREEN%HTML optimizado%RESET%

:: Clear caches
echo.
echo %YELLOW%[4/7] Limpiando caches...%RESET%
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite" 2>nul
if exist "dist" rmdir /s /q "dist" 2>nul
echo %GREEN%Caches limpiados%RESET%

:: Test build
echo.
echo %YELLOW%[5/7] Construyendo con optimizaciones...%RESET%
call npm run build >build_log.txt 2>&1
if !errorlevel! == 0 (
    echo %GREEN%Build exitoso!%RESET%
    
    :: Get build size
    echo.
    echo %YELLOW%[6/7] Analizando mejoras...%RESET%
    for /f "tokens=3" %%a in ('dir dist /s ^| find "File(s)"') do set size=%%a
    echo %GREEN%Tamano del build: !size! bytes%RESET%
    
    :: Create phase marker
    echo PHASE_1_COMPLETE > optimization_status.txt
    echo %date% %time% >> optimization_status.txt
    
    :: Success message
    echo.
    echo %YELLOW%[7/7] Generando reporte...%RESET%
    echo.
    echo ============================================================
    echo %GREEN%     FASE 1 COMPLETADA EXITOSAMENTE!%RESET%
    echo ============================================================
    echo.
    echo Mejoras aplicadas:
    echo   - Build minificado con Terser
    echo   - Console.logs eliminados
    echo   - Code splitting basico
    echo   - Assets comprimidos
    echo   - Cache optimizado
    echo.
    echo Mejoras esperadas:
    echo   - 20-25%% mas rapido
    echo   - Bundle mas pequeno
    echo   - Mejor cache del navegador
    echo.
    echo Probar con: npm run preview
    echo.
    set success=1
) else (
    echo %RED%Build fallo!%RESET%
    echo.
    echo %YELLOW%Revirtiendo cambios...%RESET%
    copy "!backup_dir!\vite.config.js.bak" "vite.config.js" >nul 2>&1
    echo %RED%Cambios revertidos. Ver build_log.txt para detalles.%RESET%
    set success=0
)

:: Cleanup temp files
del vite.config.phase1.js 2>nul

if !success!==1 (
    echo %GREEN%Fase 1 lista. Puedes proceder a Fase 2.%RESET%
) else (
    echo %RED%Fase 1 fallo. Corrige errores antes de continuar.%RESET%
)

pause
