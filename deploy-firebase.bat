@echo off
echo ========================================
echo    DEPLOY A FIREBASE CON FORMULARIO
echo           CONFIGURADO
echo ========================================
echo.

REM Verificar si Firebase CLI está instalado
where firebase >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Firebase CLI no está instalado
    echo.
    echo Instálalo con: npm install -g firebase-tools
    echo.
    pause
    exit /b 1
)

REM Verificar el email en el código
echo 📧 Verificando configuración del formulario...
findstr /C:"contacto@cloution.com" "src\pages\PortfolioPage.jsx" >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo ⚠️  ADVERTENCIA: El email por defecto sigue en el código
    echo    Archivo: src\pages\PortfolioPage.jsx (línea 53)
    echo    Email actual: contacto@cloution.com
    echo.
    echo ¿Deseas continuar con este email? (S/N)
    choice /C SN /N
    if errorlevel 2 (
        echo.
        echo 📝 Para cambiar el email:
        echo    1. Edita src\pages\PortfolioPage.jsx línea 53
        echo    2. O ejecuta: configurar-formulario.bat tu-email@ejemplo.com
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ✅ Configuración verificada
echo.

REM Build del proyecto
echo 🔨 Construyendo proyecto para producción...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Falló el build del proyecto
    pause
    exit /b 1
)

echo.
echo ✅ Build completado
echo.

REM Verificar que existe la carpeta dist
if not exist "dist" (
    echo ❌ ERROR: No se encontró la carpeta dist
    echo    Verifica que el build se haya completado correctamente
    pause
    exit /b 1
)

REM Mostrar información del proyecto
echo 🔥 Información de Firebase:
firebase projects:list

echo.
echo 📦 Desplegando a Firebase Hosting...
echo.

REM Deploy a Firebase
firebase deploy --only hosting

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✅ DEPLOY COMPLETADO CON ÉXITO
    echo ========================================
    echo.
    echo 🎉 Tu sitio está disponible en:
    firebase open hosting:site
    echo.
    echo 📋 PRÓXIMOS PASOS:
    echo.
    echo 1. Navega a /portfolio en tu sitio
    echo 2. Prueba el formulario de contacto
    echo 3. Si es la primera vez con FormSubmit:
    echo    - Revisa tu email para verificación
    echo    - Haz clic en el enlace de activación
    echo.
    echo 🧪 Para verificar que todo funcione:
    echo    - Abre firebase-test.html en tu navegador
    echo    - O visita tu-sitio.web.app/portfolio
    echo.
) else (
    echo.
    echo ❌ ERROR: Falló el deploy a Firebase
    echo.
    echo Posibles soluciones:
    echo 1. Verifica que estés logueado: firebase login
    echo 2. Inicializa Firebase si es primera vez: firebase init
    echo 3. Selecciona el proyecto correcto: firebase use [project-id]
    echo.
)

pause