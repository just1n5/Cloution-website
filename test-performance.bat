@echo off
echo ========================================
echo    PERFORMANCE TEST - CLOUTION WEBSITE
echo ========================================
echo.

:: Build the project
echo Building project for production...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed!
    echo Please fix any build errors and try again.
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

:: Start preview server
echo Starting preview server...
start /B cmd /c npm run preview

:: Wait for server to start
echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    RUNNING LIGHTHOUSE TESTS
echo ========================================
echo.

:: Run Lighthouse
echo Running Lighthouse performance test...
echo This may take a minute...
echo.

:: Check if lighthouse is installed
where npx >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npx not found. Please install Node.js
    pause
    exit /b 1
)

:: Run Lighthouse and save report
set timestamp=%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%
set report_name=lighthouse_report_%timestamp%.html

npx lighthouse http://localhost:4173 --output=html --output-path=./performance_reports/%report_name% --only-categories=performance,accessibility,best-practices,seo --throttling-method=devtools --chrome-flags="--headless"

if %errorlevel% == 0 (
    echo.
    echo ========================================
    echo    LIGHTHOUSE TEST COMPLETE
    echo ========================================
    echo.
    echo Report saved to: performance_reports\%report_name%
    echo.
    echo Opening report in browser...
    start performance_reports\%report_name%
) else (
    echo.
    echo WARNING: Lighthouse test failed or was cancelled
)

echo.
echo ========================================
echo    MANUAL TESTING CHECKLIST
echo ========================================
echo.
echo Please test the following:
echo.
echo Mobile Performance:
echo   [ ] Open Chrome DevTools (F12)
echo   [ ] Toggle device toolbar (Ctrl+Shift+M)
echo   [ ] Select "Mobile - Low-end" preset
echo   [ ] Check FPS meter (Rendering tab)
echo   [ ] Verify particles are reduced
echo   [ ] Confirm 2D icons instead of 3D
echo.
echo Desktop Performance:
echo   [ ] Check all animations are smooth
echo   [ ] Verify 3D icons load properly
echo   [ ] Test scroll performance
echo   [ ] Check memory usage in Task Manager
echo.
echo Network:
echo   [ ] Open Network tab
echo   [ ] Check total download size
echo   [ ] Verify lazy loading works
echo   [ ] Confirm Service Worker is active
echo.

:: Kill the preview server
echo.
echo Press any key to stop the preview server...
pause >nul
taskkill /f /im node.exe >nul 2>&1

echo.
echo Test complete!
pause
