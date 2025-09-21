# Script de instalación para Cloution Website
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Instalación de Cloution Website" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js está instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor, instala Node.js primero." -ForegroundColor Red
    Write-Host "   Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""

# Verificar si npm está instalado
try {
    $npmVersion = npm -v
    Write-Host "✅ npm está instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está instalado." -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""

# Limpiar instalación anterior si existe
if (Test-Path "node_modules") {
    Write-Host "🧹 Limpiando instalación anterior..." -ForegroundColor Yellow
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
Write-Host ""

# Instalar dependencias
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "✅ ¡Instalación completada exitosamente!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar el proyecto, ejecuta:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "El sitio estará disponible en:" -ForegroundColor Cyan
    Write-Host "  http://localhost:3000" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Error durante la instalación." -ForegroundColor Red
    Write-Host "Por favor, intenta ejecutar manualmente:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor White
}

Read-Host "Presiona Enter para continuar"
