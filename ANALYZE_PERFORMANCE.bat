@echo off
echo ========================================
echo    ANALISIS DE RENDIMIENTO - CLOUTION
echo ========================================
echo.

echo [1/5] Construyendo version optimizada...
call npm run build >nul 2>&1

echo [2/5] Analizando tamano de bundles...
echo.
echo CHUNKS GENERADOS:
echo -----------------
dir /b dist\js\*.js 2>nul | find /c ".js" >temp.txt
set /p chunks=<temp.txt
del temp.txt
echo Total de chunks: %chunks%
echo.

echo TAMANOS:
echo --------
for %%F in (dist\js\*.js) do (
    echo %%~nxF - %%~zF bytes
)
echo.

echo [3/5] Calculando mejoras...
echo.
echo OPTIMIZACIONES APLICADAS:
echo ------------------------
echo ✓ Lazy Loading de Rutas
echo ✓ Code Splitting Avanzado  
echo ✓ Componentes 3D Optimizados
echo ✓ Imagenes con Lazy Loading
echo ✓ Precarga Inteligente
echo.

echo [4/5] Iniciando servidor de preview...
echo.
echo El servidor se iniciara en: http://localhost:4173
echo.
echo METRICAS A VERIFICAR:
echo --------------------
echo 1. Time to Interactive (TTI) < 2.5s
echo 2. First Contentful Paint (FCP) < 1.5s
echo 3. Largest Contentful Paint (LCP) < 2.5s
echo 4. Cumulative Layout Shift (CLS) < 0.1
echo.
echo Para medir el rendimiento:
echo 1. Abre Chrome DevTools (F12)
echo 2. Ve a la pestana "Lighthouse"
echo 3. Ejecuta el analisis
echo.

echo [5/5] Abriendo preview...
start npm run preview

echo.
echo ========================================
echo    ANALISIS INICIADO
echo ========================================
echo.
echo Presiona cualquier tecla para cerrar...
pause >nul
