@echo off
echo ========================================
echo    VERIFICACION DE PWA STATUS
echo ========================================
echo.

echo Verificando componentes PWA...
echo.

set score=0

echo [Service Worker]
if exist "public\service-worker.js" (
    echo √ Archivo service-worker.js existe
    set /a score+=1
) else (
    echo X Falta service-worker.js
)

echo.
echo [Manifest]
if exist "public\manifest.json" (
    echo √ Archivo manifest.json existe
    set /a score+=1
) else (
    echo X Falta manifest.json
)

echo.
echo [Manager]
if exist "src\utils\serviceWorkerManager.js" (
    echo √ Service Worker Manager existe
    set /a score+=1
) else (
    echo X Falta serviceWorkerManager.js
)

echo.
echo [Componente PWA Status]
if exist "src\components\PWAStatus.jsx" (
    echo √ Componente PWAStatus existe
    set /a score+=1
) else (
    echo X Falta PWAStatus.jsx
)

echo.
echo [Iconos]
if exist "public\icons" (
    echo √ Directorio de iconos existe
    dir /b "public\icons\*.svg" 2>nul | find /c ".svg" >temp.txt
    set /p iconcount=<temp.txt
    del temp.txt
    echo   Iconos encontrados: %iconcount%
    if %iconcount% gtr 0 set /a score+=1
) else (
    echo X No existe directorio de iconos
)

echo.
echo [Index HTML]
findstr /C:"manifest.json" "index.html" >nul
if %errorlevel% equ 0 (
    echo √ Manifest enlazado en index.html
    set /a score+=1
) else (
    echo X Manifest no enlazado en index.html
)

echo.
echo [App.jsx Integration]
findstr /C:"swManager" "src\App.jsx" >nul
if %errorlevel% equ 0 (
    echo √ Service Worker integrado en App.jsx
    set /a score+=1
) else (
    echo X Service Worker no integrado en App.jsx
)

echo.
echo ========================================
echo    RESULTADO: %score% / 7
echo ========================================
echo.

if %score% equ 7 (
    echo ✅ PWA COMPLETAMENTE CONFIGURADA!
    echo.
    echo Tu aplicacion esta lista para:
    echo - Funcionar offline
    echo - Instalarse como app nativa
    echo - Cachear recursos inteligentemente
    echo - Actualizarse automaticamente
) else if %score% geq 5 (
    echo ⚠️  PWA PARCIALMENTE CONFIGURADA
    echo.
    echo Revisa los componentes faltantes arriba.
) else (
    echo ❌ PWA NO CONFIGURADA
    echo.
    echo Ejecuta INSTALL_SERVICE_WORKER.bat primero.
)

echo.
echo ========================================
echo    COMANDOS UTILES
echo ========================================
echo.
echo Para desarrollo (sin SW):
echo   npm run dev
echo.
echo Para testing PWA (con SW):
echo   npm run build
echo   npm run preview
echo.
echo Para instalar PWA:
echo   .\INSTALL_SERVICE_WORKER.bat
echo.
echo Para generar iconos:
echo   .\GENERATE_PWA_ICONS.bat
echo.
pause
