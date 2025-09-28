@echo off
setlocal EnableDelayedExpansion
cls

echo ============================================================
echo         FASE 2: SMART LOADING OPTIMIZATION
echo                   Riesgo: MEDIO
echo ============================================================
echo.

set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set RESET=[0m

:: Check if Phase 1 is complete
if not exist "optimization_status.txt" (
    echo %RED%ERROR: Debes completar Fase 1 primero!%RESET%
    echo Ejecuta: optimize-phase-1.bat
    pause
    exit /b 1
)

findstr /C:"PHASE_1_COMPLETE" optimization_status.txt >nul
if !errorlevel! neq 0 (
    echo %RED%ERROR: Fase 1 no esta completa!%RESET%
    pause
    exit /b 1
)

:: Create backup
echo %YELLOW%[1/6] Creando backup...%RESET%
set backup_dir=backups\phase2_%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%
set backup_dir=!backup_dir: =0!
mkdir "!backup_dir!" 2>nul
copy "src\App.jsx" "!backup_dir!\App.jsx.bak" >nul 2>&1
echo %GREEN%Backup creado%RESET%

:: Create optimized App.jsx with safe lazy loading
echo.
echo %YELLOW%[2/6] Aplicando lazy loading seguro...%RESET%
(
echo import React, { useState, useEffect, lazy, Suspense } from 'react'
echo import { Routes, Route } from 'react-router-dom'
echo import { AnimatePresence } from 'framer-motion'
echo.
echo // Componentes criticos se cargan inmediatamente
echo import Header from './components/Header'
echo import Hero from './components/Hero'
echo import Loader from './components/Loader'
echo import Footer from './components/Footer'
echo import ParticleBackground from './components/ParticleBackground'
echo.
echo // Lazy loading SOLO para componentes pesados no criticos
echo const About = lazy^(^(^) =^> import^('./components/About'^)^)
echo const Features = lazy^(^(^) =^> import^('./components/Features'^)^)
echo const Services = lazy^(^(^) =^> import^('./components/Services'^)^)
echo const WebDevPromo = lazy^(^(^) =^> import^('./components/WebDevPromo'^)^)
echo const Philosophy = lazy^(^(^) =^> import^('./components/Philosophy'^)^)
echo const FinalCTA = lazy^(^(^) =^> import^('./components/FinalCTA'^)^)
echo.
echo // Lazy loading para paginas secundarias
echo const PortfolioPage = lazy^(^(^) =^> import^('./pages/PortfolioPage'^)^)
echo.
echo // Loading fallback simple
echo const SectionLoader = ^(^) =^> ^(
echo   ^<div className="min-h-[100px] flex items-center justify-center"^>
echo     ^<div className="animate-pulse text-gray-500"^>Cargando...^</div^>
echo   ^</div^>
echo ^)
echo.
echo const HomePage = ^(^) =^> {
echo   return ^(
echo     ^<^>
echo       ^<Hero /^>
echo       ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo         ^<About /^>
echo       ^</Suspense^>
echo       ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo         ^<Features /^>
echo       ^</Suspense^>
echo       ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo         ^<Services /^>
echo       ^</Suspense^>
echo       ^<section id="desarrollo-web"^>
echo         ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo           ^<WebDevPromo /^>
echo         ^</Suspense^>
echo       ^</section^>
echo       ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo         ^<Philosophy /^>
echo       ^</Suspense^>
echo       ^<Suspense fallback=^{^<SectionLoader /^>^}^>
echo         ^<FinalCTA /^>
echo       ^</Suspense^>
echo     ^</^>
echo   ^)
echo }
echo.
echo function App^(^) {
echo   const [isLoading, setIsLoading] = useState^(true^)
echo.
echo   useEffect^(^(^) =^> {
echo     const timer = setTimeout^(^(^) =^> {
echo       setIsLoading^(false^)
echo     }, 800^) // Reducido a 800ms
echo.
echo     return ^(^) =^> clearTimeout^(timer^)
echo   }, []^)
echo.
echo   return ^(
echo     ^<^>
echo       ^<AnimatePresence mode="wait"^>
echo         {isLoading ^&^& ^<Loader key="loader" /^>}
echo       ^</AnimatePresence^>
echo.
echo       {!isLoading ^&^& ^(
echo         ^<div className="relative min-h-screen overflow-x-hidden"^>
echo           ^<ParticleBackground /^>
echo           ^<div className="relative z-10"^>
echo             ^<Header /^>
echo             ^<Suspense fallback=^{^<Loader /^>^}^>
echo               ^<Routes^>
echo                 ^<Route path="/" element=^{^<HomePage /^>} /^>
echo                 ^<Route path="/portfolio" element=^{^<PortfolioPage /^>} /^>
echo               ^</Routes^>
echo             ^</Suspense^>
echo             ^<Footer /^>
echo           ^</div^>
echo         ^</div^>
echo       ^)}
echo     ^</^>
echo   ^)
echo }
echo.
echo export default App
) > src\App.phase2.jsx

:: Backup current and apply new
copy "src\App.jsx" "src\App.phase2.backup.jsx" >nul 2>&1
copy "src\App.phase2.jsx" "src\App.jsx" >nul 2>&1
echo %GREEN%Lazy loading aplicado%RESET%

:: Clear cache
echo.
echo %YELLOW%[3/6] Limpiando cache...%RESET%
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite" 2>nul
if exist "dist" rmdir /s /q "dist" 2>nul
echo %GREEN%Cache limpiado%RESET%

:: Build test
echo.
echo %YELLOW%[4/6] Probando build...%RESET%
call npm run build >build_phase2_log.txt 2>&1
if !errorlevel! == 0 (
    echo %GREEN%Build exitoso!%RESET%
    
    :: Update status
    echo PHASE_2_COMPLETE >> optimization_status.txt
    echo %date% %time% >> optimization_status.txt
    
    :: Analyze improvements
    echo.
    echo %YELLOW%[5/6] Analizando mejoras...%RESET%
    for /f "tokens=3" %%a in ('dir dist\js /s 2^>nul ^| find "File(s)"') do set js_size=%%a
    echo %GREEN%JavaScript total: !js_size! bytes%RESET%
    
    echo.
    echo %YELLOW%[6/6] Generando reporte...%RESET%
    echo.
    echo ============================================================
    echo %GREEN%     FASE 2 COMPLETADA EXITOSAMENTE!%RESET%
    echo ============================================================
    echo.
    echo Mejoras aplicadas:
    echo   - Lazy loading de componentes pesados
    echo   - Suspense boundaries
    echo   - Loading placeholders
    echo   - Tiempo inicial reducido a 800ms
    echo.
    echo Mejoras esperadas:
    echo   - 30-35%% First Paint mas rapido
    echo   - JavaScript inicial reducido
    echo   - Mejor Time to Interactive
    echo.
    echo Probar con: npm run preview
    echo.
    set success=1
) else (
    echo %RED%Build fallo!%RESET%
    echo.
    echo %YELLOW%Revirtiendo cambios...%RESET%
    copy "!backup_dir!\App.jsx.bak" "src\App.jsx" >nul 2>&1
    echo %RED%Cambios revertidos. Ver build_phase2_log.txt%RESET%
    set success=0
)

:: Cleanup
del "src\App.phase2.jsx" 2>nul

if !success!==1 (
    echo %GREEN%Fase 2 completada. Puedes proceder a Fase 3.%RESET%
) else (
    echo %RED%Fase 2 fallo. Revisa los errores.%RESET%
)

pause
