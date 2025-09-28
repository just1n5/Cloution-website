@echo off
echo ========================================
echo    QUICK DEPLOY A FIREBASE
echo ========================================
echo.

echo [1/3] Creando build optimizado...
call npm run build >nul 2>&1

REM Copiar archivos PWA
if not exist "dist\service-worker.js" copy "public\service-worker.js" "dist\" >nul
if not exist "dist\manifest.json" copy "public\manifest.json" "dist\" >nul
if not exist "dist\icons" xcopy "public\icons" "dist\icons\" /E /I /Y >nul

echo ✓ Build creado

echo.
echo [2/3] Desplegando a Firebase...
call firebase deploy --only hosting

echo.
echo [3/3] Abriendo sitio...
timeout /t 2 /nobreak >nul
call firebase open hosting:site

echo.
echo ========================================
echo    DEPLOY COMPLETADO
echo ========================================
echo.
pause
