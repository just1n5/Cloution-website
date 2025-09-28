@echo off
cls
color 0E

echo ============================================================
echo          VERIFICACION PRE-OPTIMIZACION
echo ============================================================
echo.

set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set RESET=[0m

set all_ready=1

:: Check Node version
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=1" %%i in ('node --version') do set node_ver=%%i
    echo [OK] Node.js !node_ver!
) else (
    echo [X] Node.js no encontrado
    set all_ready=0
)

:: Check npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=1" %%i in ('npm --version') do set npm_ver=%%i
    echo [OK] npm !npm_ver!
) else (
    echo [X] npm no encontrado
    set all_ready=0
)

:: Check if project builds
echo Verificando build actual...
call npm run build >test_build.log 2>&1
if %errorlevel% == 0 (
    echo [OK] Build exitoso
    del test_build.log 2>nul
) else (
    echo [X] Build falla - ejecuta 1CLICK_FIX.bat primero
    set all_ready=0
)

:: Check backup directory
echo Verificando directorio de backups...
if exist "backups" (
    echo [OK] Directorio backups existe
) else (
    mkdir backups
    echo [OK] Directorio backups creado
)

:: Check optimization scripts
echo Verificando scripts de optimizacion...
set scripts_ok=1
if not exist "optimize-phase-1.bat" set scripts_ok=0
if not exist "optimize-phase-2.bat" set scripts_ok=0
if not exist "optimize-phase-3.bat" set scripts_ok=0

if !scripts_ok! == 1 (
    echo [OK] Todos los scripts presentes
) else (
    echo [X] Faltan scripts de optimizacion
    set all_ready=0
)

echo.
echo ============================================================

if !all_ready! == 1 (
    echo.
    echo RESULTADO: TODO LISTO PARA OPTIMIZAR!
    echo.
    echo Ejecuta: START_OPTIMIZATION.bat
    echo.
) else (
    echo.
    echo RESULTADO: HAY PROBLEMAS QUE RESOLVER
    echo.
    echo 1. Si el build falla, ejecuta: 1CLICK_FIX.bat
    echo 2. Verifica que Node.js este instalado
    echo 3. Asegurate de estar en el directorio correcto
    echo.
)

echo ============================================================
echo.
pause
