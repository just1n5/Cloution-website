@echo off
echo ========================================
echo    SOLUCION RAPIDA DE ERRORES
echo ========================================
echo.

echo [1/4] Deteniendo servidor actual...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] Limpiando caches...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist "dist" rmdir /s /q "dist"
echo √ Caches limpiados

echo [3/4] Verificando dependencias...
call npm list react react-dom react-router-dom >nul 2>&1
if %errorlevel% neq 0 (
    echo ! Reinstalando dependencias criticas...
    call npm install react react-dom react-router-dom --save
) else (
    echo √ Dependencias verificadas
)

echo [4/4] Iniciando servidor de desarrollo...
echo.
echo ========================================
echo    SERVIDOR INICIANDO...
echo ========================================
echo.
echo Si el error persiste:
echo 1. Ejecuta CLEAN_REBUILD.bat
echo 2. Elimina node_modules y package-lock.json
echo 3. Ejecuta npm install
echo.
echo Iniciando en http://localhost:3000
echo.
call npm run dev
