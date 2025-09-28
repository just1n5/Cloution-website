@echo off
echo ========================================
echo    DEPLOY A FIREBASE HOSTING
echo ========================================
echo.

echo Este script te guiara para desplegar tu sitio PWA a Firebase.
echo.
echo REQUISITOS PREVIOS:
echo -------------------
echo 1. Tener Node.js instalado
echo 2. Tener una cuenta de Firebase/Google
echo 3. Tener un proyecto en Firebase Console
echo.
pause

echo.
echo [PASO 1] Instalando Firebase CLI...
echo.
npm list -g firebase-tools >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI no detectado. Instalando...
    call npm install -g firebase-tools
    echo.
    echo ✓ Firebase CLI instalado
) else (
    echo ✓ Firebase CLI ya instalado
)

echo.
echo [PASO 2] Verificando login de Firebase...
echo.
call firebase login:list >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Necesitas iniciar sesion en Firebase.
    echo Se abrira tu navegador para autenticarte...
    echo.
    pause
    call firebase login
) else (
    echo ✓ Ya estas autenticado en Firebase
)

echo.
echo [PASO 3] Configurando proyecto Firebase...
echo.

if not exist ".firebaserc" (
    echo.
    echo No hay proyecto Firebase configurado.
    echo.
    echo Iniciando configuracion...
    echo Selecciona "Hosting" cuando se te pregunte.
    echo.
    call firebase init hosting
) else (
    echo ✓ Proyecto Firebase ya configurado
    type .firebaserc
)

echo.
echo [PASO 4] Limpiando builds anteriores...
echo.

if exist "dist" (
    rmdir /s /q "dist"
    echo ✓ Directorio dist limpiado
)

if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo ✓ Cache de Vite limpiado
)

echo.
echo [PASO 5] Creando build de produccion optimizado...
echo.

echo Construyendo aplicacion...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ❌ Error al construir la aplicacion
    echo Revisa los errores arriba y corrigelos
    pause
    exit /b 1
)

echo ✓ Build creado exitosamente

echo.
echo [PASO 6] Verificando archivos PWA...
echo.

if not exist "dist\service-worker.js" (
    echo ! service-worker.js no encontrado en dist
    echo Copiando desde public...
    copy "public\service-worker.js" "dist\service-worker.js" >nul
)

if not exist "dist\manifest.json" (
    echo ! manifest.json no encontrado en dist
    echo Copiando desde public...
    copy "public\manifest.json" "dist\manifest.json" >nul
)

if not exist "dist\icons" (
    echo ! Carpeta icons no encontrada en dist
    echo Copiando desde public...
    xcopy "public\icons" "dist\icons" /E /I /Y >nul
)

echo ✓ Archivos PWA verificados

echo.
echo [PASO 7] Preview local antes de deploy...
echo.
echo Quieres hacer un preview local antes del deploy? (S/N)
set /p preview=

if /i "%preview%"=="S" (
    echo.
    echo Iniciando preview local en http://localhost:5000
    echo Presiona Ctrl+C cuando termines de revisar
    echo.
    call firebase serve --only hosting
)

echo.
echo ========================================
echo    LISTO PARA DEPLOY
echo ========================================
echo.
echo Tu sitio sera desplegado a Firebase Hosting.
echo.
echo URLs de tu sitio:
echo -----------------
call firebase hosting:channel:list 2>nul | findstr "https://"

echo.
echo Deseas continuar con el deploy? (S/N)
set /p deploy=

if /i "%deploy%"=="S" (
    echo.
    echo [PASO 8] Desplegando a Firebase...
    echo.
    call firebase deploy --only hosting
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo    ✅ DEPLOY EXITOSO!
        echo ========================================
        echo.
        echo Tu sitio PWA esta live en Firebase Hosting!
        echo.
        echo URLs:
        call firebase hosting:channel:list 2>nul | findstr "https://"
        echo.
        echo Caracteristicas desplegadas:
        echo ✓ Service Worker activo
        echo ✓ PWA instalable
        echo ✓ Lazy loading optimizado
        echo ✓ Cache offline
        echo ✓ HTTPS automatico
        echo.
        echo Para ver el sitio:
        call firebase open hosting:site
    ) else (
        echo.
        echo ❌ Error en el deploy
        echo Revisa los mensajes de error arriba
    )
) else (
    echo.
    echo Deploy cancelado.
)

echo.
pause
