@echo off
echo ========================================
echo   Instalando dependencias 3D Icons
echo   Cloution Solar System
echo ========================================
echo.

cd /d "C:\Users\justi\Desktop\Cloution_Website"

echo [1/3] Instalando Three.js...
npm install three@latest

echo.
echo [2/3] Instalando React Three Fiber...
npm install @react-three/fiber@latest

echo.
echo [3/3] Instalando React Three Drei...
npm install @react-three/drei@latest

echo.
echo ========================================
echo   Instalacion completada!
echo ========================================
echo.
echo Para usar los iconos 3D:
echo.
echo 1. Importa los iconos:
echo    import * as Icons from './icons'
echo.
echo 2. Usa en un Canvas de three/fiber:
echo    ^<Canvas^>
echo      ^<Icons.AiDataIcon3D /^>
echo    ^</Canvas^>
echo.
echo 3. Para ver ejemplos, ejecuta:
echo    npm run dev
echo    Y navega a /icons-preview
echo.
pause
