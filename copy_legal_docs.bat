@echo off
echo ========================================
echo    COPIANDO DOCUMENTOS LEGALES
echo ========================================

REM Crear directorio si no existe
if not exist "public\legal" mkdir "public\legal"

echo.
echo Copiando documentos legales a public/legal...

xcopy /Y /I "legal_docs\*.*" "public\legal\"

echo.
echo ========================================
echo    DOCUMENTOS COPIADOS EXITOSAMENTE!
echo ========================================
echo.
echo Los documentos están ahora en public/legal/
echo.
pause
