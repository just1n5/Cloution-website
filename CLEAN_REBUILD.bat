@echo off
echo ========================================
echo    LIMPIEZA COMPLETA Y REBUILD
echo ========================================
echo.

echo [1/6] Deteniendo cualquier proceso de Node...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/6] Eliminando carpeta dist...
if exist "dist" (
    rmdir /s /q "dist"
    echo √ Carpeta dist eliminada
) else (
    echo - No hay carpeta dist que eliminar
)

echo [3/6] Eliminando cache de Vite...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo √ Cache de Vite eliminado
) else (
    echo - No hay cache de Vite que eliminar
)

echo [4/6] Limpiando cache de NPM...
call npm cache clean --force >nul 2>&1
echo √ Cache de NPM limpiado

echo [5/6] Reinstalando dependencias...
echo Esto puede tomar unos minutos...
call npm install --force >nul 2>&1
echo √ Dependencias reinstaladas

echo [6/6] Creando nuevo build optimizado...
call npm run build

echo.
echo ========================================
echo    LIMPIEZA Y REBUILD COMPLETADO
echo ========================================
echo.
echo El proyecto ha sido completamente limpiado y reconstruido.
echo.
echo Para iniciar el servidor de desarrollo:
echo   npm run dev
echo.
echo Para ver el build de produccion:
echo   npm run preview
echo.
pause
