@echo off
title Cloution Website - Inicio Rapido

echo ================================================
echo    CLOUTION - Landing Page
echo ================================================
echo.
echo Preparando el entorno de desarrollo...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado!
    echo.
    echo Por favor, instala Node.js desde:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Primera ejecucion detectada. Instalando dependencias...
    echo.
    call npm install
    echo.
    if %errorlevel% neq 0 (
        echo [ERROR] Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
)

echo ================================================
echo    Iniciando servidor de desarrollo...
echo ================================================
echo.
echo El sitio se abrira automaticamente en tu navegador
echo o puedes acceder manualmente a:
echo.
echo    http://localhost:3000
echo.
echo Para detener el servidor, presiona Ctrl+C
echo ================================================
echo.

REM Iniciar el servidor de desarrollo
call npm run dev

pause
