@echo off
echo ========================================
echo    COPIANDO IMAGENES DEL PORTFOLIO
echo ========================================

REM Crear directorio si no existe
if not exist "public\portfolio" mkdir "public\portfolio"
if not exist "public\portfolio\consultorio-legispro" mkdir "public\portfolio\consultorio-legispro"
if not exist "public\portfolio\aromas-de-origen" mkdir "public\portfolio\aromas-de-origen"
if not exist "public\portfolio\el-sabor-de-soacha" mkdir "public\portfolio\el-sabor-de-soacha"
if not exist "public\portfolio\sonrisa-sana" mkdir "public\portfolio\sonrisa-sana"

echo.
echo Copiando imágenes de Consultorio Legispro...
xcopy /Y /I "src\portfolio_screenshots\consultorio-legispro\*" "public\portfolio\consultorio-legispro\"

echo.
echo Copiando imágenes de Aromas de Origen...
xcopy /Y /I "src\portfolio_screenshots\aromas-de-origen\*" "public\portfolio\aromas-de-origen\"

echo.
echo Copiando imágenes de El Sabor de Soacha...
xcopy /Y /I "src\portfolio_screenshots\el-sabor-de-soacha\*" "public\portfolio\el-sabor-de-soacha\"

echo.
echo Copiando imágenes de Sonrisa Sana...
xcopy /Y /I "src\portfolio_screenshots\sonrisa-sana\*" "public\portfolio\sonrisa-sana\"

echo.
echo ========================================
echo    IMAGENES COPIADAS EXITOSAMENTE!
echo ========================================
echo.
echo Las imágenes están ahora en public/portfolio/
echo.
pause
