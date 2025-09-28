@echo off
echo ========================================
echo    GENERANDO ICONOS PWA PLACEHOLDER
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo.

echo Generando iconos placeholder...
node scripts/generatePWAIcons.js

echo.
echo ========================================
echo    ICONOS GENERADOS
echo ========================================
echo.
echo Los iconos placeholder han sido creados en: public/icons/
echo.
echo ⚠️  IMPORTANTE:
echo Estos son solo placeholders SVG.
echo Necesitas convertirlos a PNG para usar en producción.
echo.
echo Herramientas recomendadas:
echo 1. https://realfavicongenerator.net/
echo 2. https://www.pwabuilder.com/imageGenerator
echo 3. https://cloudconvert.com/svg-to-png
echo.
pause
