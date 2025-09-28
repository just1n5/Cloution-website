@echo off
setlocal EnableDelayedExpansion
cls

echo ============================================================
echo      APLICAR TODAS LAS FASES DE OPTIMIZACION
echo            Sistema Automatico con Validacion
echo ============================================================
echo.

set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set CYAN=[96m
set RESET=[0m

:: Confirm action
echo %YELLOW%ADVERTENCIA:%RESET%
echo Este script aplicara todas las fases de optimizacion
echo de manera secuencial. Si alguna falla, se detendra.
echo.
echo Se crearan backups automaticos de cada fase.
echo.
set /p confirm="Deseas continuar? (S/N): "
if /i not "!confirm!"=="S" (
    echo.
    echo Operacion cancelada.
    pause
    exit /b 0
)

:: Create master backup
echo.
echo %YELLOW%Creando backup maestro...%RESET%
set master_backup=backups\master_%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%
set master_backup=!master_backup: =0!
mkdir "!master_backup!" 2>nul

:: Backup all critical files
xcopy /E /I /Y src "!master_backup!\src" >nul 2>&1
copy "vite.config.js" "!master_backup!\vite.config.js" >nul 2>&1
copy "package.json" "!master_backup!\package.json" >nul 2>&1
copy "index.html" "!master_backup!\index.html" >nul 2>&1
echo %GREEN%Backup maestro creado en: !master_backup!%RESET%

:: Initialize results
set phase1_result=PENDING
set phase2_result=PENDING
set phase3_result=PENDING

:: PHASE 1
echo.
echo ============================================================
echo %CYAN%FASE 1: BASE PERFORMANCE%RESET%
echo ============================================================
echo.

call optimize-phase-1.bat >phase1_output.txt 2>&1
if !errorlevel! == 0 (
    set phase1_result=SUCCESS
    echo %GREEN%[✓] Fase 1 completada exitosamente%RESET%
) else (
    set phase1_result=FAILED
    echo %RED%[X] Fase 1 fallo%RESET%
    echo Ver detalles en: phase1_output.txt
    goto :report
)

:: Wait before next phase
timeout /t 3 /nobreak >nul

:: PHASE 2
echo.
echo ============================================================
echo %CYAN%FASE 2: SMART LOADING%RESET%
echo ============================================================
echo.

call optimize-phase-2.bat >phase2_output.txt 2>&1
if !errorlevel! == 0 (
    set phase2_result=SUCCESS
    echo %GREEN%[✓] Fase 2 completada exitosamente%RESET%
) else (
    set phase2_result=FAILED
    echo %RED%[X] Fase 2 fallo%RESET%
    echo Ver detalles en: phase2_output.txt
    goto :report
)

:: Wait before next phase
timeout /t 3 /nobreak >nul

:: PHASE 3
echo.
echo ============================================================
echo %CYAN%FASE 3: PARTICLE OPTIMIZATION%RESET%
echo ============================================================
echo.

call optimize-phase-3.bat >phase3_output.txt 2>&1
if !errorlevel! == 0 (
    set phase3_result=SUCCESS
    echo %GREEN%[✓] Fase 3 completada exitosamente%RESET%
) else (
    set phase3_result=FAILED
    echo %RED%[X] Fase 3 fallo%RESET%
    echo Ver detalles en: phase3_output.txt
    goto :report
)

:report
:: Generate final report
echo.
echo ============================================================
echo %CYAN%        REPORTE FINAL DE OPTIMIZACION%RESET%
echo ============================================================
echo.
echo Fecha: %date% %time%
echo.
echo %YELLOW%Resultados por Fase:%RESET%
echo ===================================

if "!phase1_result!"=="SUCCESS" (
    echo Fase 1: %GREEN%EXITOSA%RESET% - Base Performance aplicado
) else if "!phase1_result!"=="FAILED" (
    echo Fase 1: %RED%FALLO%RESET% - Ver phase1_output.txt
) else (
    echo Fase 1: NO EJECUTADA
)

if "!phase2_result!"=="SUCCESS" (
    echo Fase 2: %GREEN%EXITOSA%RESET% - Smart Loading aplicado
) else if "!phase2_result!"=="FAILED" (
    echo Fase 2: %RED%FALLO%RESET% - Ver phase2_output.txt
) else (
    echo Fase 2: NO EJECUTADA
)

if "!phase3_result!"=="SUCCESS" (
    echo Fase 3: %GREEN%EXITOSA%RESET% - Particles optimizado
) else if "!phase3_result!"=="FAILED" (
    echo Fase 3: %RED%FALLO%RESET% - Ver phase3_output.txt
) else (
    echo Fase 3: NO EJECUTADA
)

echo.
echo ===================================
echo.

:: Count successful phases
set /a success_count=0
if "!phase1_result!"=="SUCCESS" set /a success_count+=1
if "!phase2_result!"=="SUCCESS" set /a success_count+=1
if "!phase3_result!"=="SUCCESS" set /a success_count+=1

if !success_count! == 3 (
    echo %GREEN%¡TODAS LAS OPTIMIZACIONES APLICADAS EXITOSAMENTE!%RESET%
    echo.
    echo Mejoras estimadas:
    echo   - 65-70%% mas rapido
    echo   - 50%% menos CPU en moviles
    echo   - Bundle 40%% mas pequeno
    echo.
    echo %CYAN%Ejecutar prueba de performance:%RESET%
    echo   npm run preview
) else if !success_count! GTR 0 (
    echo %YELLOW%OPTIMIZACION PARCIAL%RESET%
    echo.
    echo Se aplicaron !success_count! de 3 fases exitosamente.
    echo Revisa los logs de las fases fallidas.
) else (
    echo %RED%OPTIMIZACION FALLIDA%RESET%
    echo.
    echo Ninguna fase pudo aplicarse exitosamente.
    echo.
    echo Para restaurar el backup maestro:
    echo   xcopy /E /I /Y "!master_backup!\*" . 
)

echo.
echo ===================================
echo.
echo Backup maestro guardado en:
echo !master_backup!
echo.
echo Logs de cada fase:
echo   - phase1_output.txt
echo   - phase2_output.txt
echo   - phase3_output.txt
echo.

:: Ask to run preview
if !success_count! GTR 0 (
    echo.
    set /p run_preview="¿Deseas ejecutar el preview ahora? (S/N): "
    if /i "!run_preview!"=="S" (
        echo.
        echo %YELLOW%Iniciando preview...%RESET%
        call npm run build >nul 2>&1
        call npm run preview
    )
)

echo.
pause
