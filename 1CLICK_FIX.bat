@echo off
cls
color 0A
echo.
echo  ========================================
echo     SOLUCION RAPIDA - 1 CLICK
echo  ========================================
echo.

:: Paso 1: Restaurar archivos seguros
echo [1/5] Restaurando archivos originales...
if exist "src\App.original.jsx" copy "src\App.original.jsx" "src\App.jsx" >nul
if exist "vite.config.original.js" copy "vite.config.original.js" "vite.config.js" >nul
if exist "src\components\ParticleBackground.original.jsx" copy "src\components\ParticleBackground.original.jsx" "src\components\ParticleBackground.jsx" >nul

:: Paso 2: Limpiar todo
echo [2/5] Limpiando proyecto...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite" 2>nul
if exist "dist" rmdir /s /q "dist" 2>nul
call npm cache clean --force >nul 2>&1

:: Paso 3: Instalar terser si falta
echo [3/5] Verificando dependencias...
call npm list terser >nul 2>&1
if %errorlevel% neq 0 (
    call npm install --save-dev terser >nul 2>&1
)

:: Paso 4: Build
echo [4/5] Construyendo proyecto...
call npm run build >nul 2>&1

if %errorlevel% == 0 (
    color 0A
    echo [5/5] Build exitoso!
    echo.
    echo  ========================================
    echo         PROYECTO REPARADO!
    echo  ========================================
    echo.
    echo  Abriendo en: http://localhost:4173
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:4173
    call npm run preview
) else (
    color 0C
    echo [5/5] Build fallo - aplicando fix alternativo...
    
    :: Reinstalar dependencias críticas
    echo.
    echo Reinstalando React...
    call npm uninstall react react-dom react-router-dom >nul 2>&1
    call npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.20.0 >nul 2>&1
    
    :: Intentar build de nuevo
    echo Intentando build nuevamente...
    call npm run build
    
    if %errorlevel% == 0 (
        color 0A
        echo.
        echo  ========================================
        echo     REPARADO DESPUES DE REINSTALAR!
        echo  ========================================
        call npm run preview
    ) else (
        color 0C
        echo.
        echo  ========================================
        echo           REQUIERE ATENCION MANUAL
        echo  ========================================
        echo.
        echo  Por favor ejecuta:
        echo    1. npm install --force
        echo    2. npm run build
        echo    3. npm run preview
    )
)

pause
