@echo off
echo ========================================
echo    PREVIEW DEPLOY (STAGING)
echo ========================================
echo.

echo Este script crea un preview/staging del sitio antes del deploy final.
echo.

echo [1/4] Verificando Firebase CLI...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI no instalado
    echo Ejecuta primero: npm install -g firebase-tools
    pause
    exit /b 1
)
echo ✓ Firebase CLI detectado

echo.
echo [2/4] Creando build de produccion...
call npm run build >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error en build
    echo Ejecuta: npm run build
    pause
    exit /b 1
)

REM Copiar archivos PWA si no existen
if not exist "dist\service-worker.js" copy "public\service-worker.js" "dist\" >nul
if not exist "dist\manifest.json" copy "public\manifest.json" "dist\" >nul
if not exist "dist\icons" xcopy "public\icons" "dist\icons\" /E /I /Y >nul

echo ✓ Build creado

echo.
echo [3/4] Creando preview channel...
echo.

REM Generar nombre unico para el preview
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value ^| find "="') do set datetime=%%I
set preview_name=preview-%datetime:~0,8%-%datetime:~8,6%

echo Creando preview: %preview_name%
call firebase hosting:channel:deploy %preview_name% --expires 7d

echo.
echo [4/4] Preview creado!
echo.

echo ========================================
echo    PREVIEW URL DISPONIBLE
echo ========================================
echo.
echo Tu preview estara disponible por 7 dias en:
echo.
call firebase hosting:channel:list | findstr %preview_name%
echo.
echo Comparte esta URL para revision antes del deploy final.
echo.
echo Para hacer deploy final ejecuta:
echo   firebase deploy --only hosting
echo.
echo O usa:
echo   .\DEPLOY_TO_FIREBASE.bat
echo.
pause
