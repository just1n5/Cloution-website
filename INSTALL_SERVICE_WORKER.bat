@echo off
echo ========================================
echo    INSTALACION SERVICE WORKER & PWA
echo ========================================
echo.

echo [1/7] Verificando estructura de archivos...

if exist "public\service-worker.js" (
    echo √ Service Worker encontrado
) else (
    echo X Service Worker no encontrado
    echo   Verifica que public\service-worker.js existe
    pause
    exit /b 1
)

if exist "public\manifest.json" (
    echo √ Manifest.json encontrado
) else (
    echo X Manifest.json no encontrado
    pause
    exit /b 1
)

if exist "src\utils\serviceWorkerManager.js" (
    echo √ Service Worker Manager encontrado
) else (
    echo X Service Worker Manager no encontrado
    pause
    exit /b 1
)

echo.
echo [2/7] Creando directorio de iconos...
if not exist "public\icons" (
    mkdir "public\icons"
    echo √ Directorio public\icons creado
) else (
    echo √ Directorio public\icons existe
)

echo.
echo [3/7] Generando iconos placeholder...
echo.
node scripts\generatePWAIcons.js
echo.

echo [4/7] Limpiando cache anterior...
if exist "dist" (
    rmdir /s /q "dist" 2>nul
    echo √ Directorio dist limpiado
)

if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite" 2>nul
    echo √ Cache de Vite limpiado
)

echo.
echo [5/7] Construyendo version de produccion...
call npm run build >nul 2>&1
if %errorlevel% equ 0 (
    echo √ Build de produccion creado
) else (
    echo X Error en el build
    echo   Ejecuta 'npm run build' para ver el error
    pause
    exit /b 1
)

echo.
echo [6/7] Verificando archivos generados...
if exist "dist\service-worker.js" (
    echo √ Service Worker copiado a dist
) else (
    echo ! Service Worker no se copio a dist
    echo   Copiando manualmente...
    copy "public\service-worker.js" "dist\service-worker.js" >nul
)

if exist "dist\manifest.json" (
    echo √ Manifest copiado a dist
) else (
    echo ! Manifest no se copio a dist
    echo   Copiando manualmente...
    copy "public\manifest.json" "dist\manifest.json" >nul
)

echo.
echo [7/7] Iniciando servidor de preview...
echo.
echo ========================================
echo    INSTALACION COMPLETADA
echo ========================================
echo.
echo Service Worker y PWA configurados exitosamente!
echo.
echo PROXIMOS PASOS:
echo ---------------
echo 1. El servidor se abrira en http://localhost:4173
echo 2. Abre Chrome DevTools (F12)
echo 3. Ve a Application → Service Workers
echo 4. Verifica que el SW esta "Activated and running"
echo 5. Prueba el modo offline: Network → Offline
echo 6. Instala la PWA desde el icono en la barra de direcciones
echo.
echo IMPORTANTE:
echo -----------
echo - Convierte los iconos SVG a PNG para produccion real
echo - El Service Worker SOLO funciona en HTTPS o localhost
echo - En desarrollo usa: npm run dev (sin Service Worker)
echo - En produccion usa: npm run preview (con Service Worker)
echo.
echo Abriendo navegador...
timeout /t 3 /nobreak >nul
start http://localhost:4173
echo.
call npm run preview
