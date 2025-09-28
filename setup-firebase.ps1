# Script de Setup para Firebase - Cloution Website (Windows)
# Este script configura Firebase Hosting para el proyecto

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "            SETUP FIREBASE - CLOUTION             " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Funciones para mostrar mensajes
function Show-Success {
    param($Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Show-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Show-Warning {
    param($Message)
    Write-Host "[AVISO] $Message" -ForegroundColor Yellow
}

# Verificar Node.js
Write-Host "Verificando pre-requisitos..." -ForegroundColor White
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Show-Success "Node.js instalado: $nodeVersion"
    } else {
        Show-Error "Node.js no está instalado. Por favor, instálalo primero."
        Write-Host "Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Show-Error "Node.js no está instalado."
    exit 1
}

# Verificar NPM
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Show-Success "NPM instalado: $npmVersion"
    } else {
        Show-Error "NPM no está instalado."
        exit 1
    }
} catch {
    Show-Error "NPM no está instalado."
    exit 1
}

# Instalar Firebase CLI si no existe
Write-Host ""
Write-Host "Comprobando Firebase CLI..." -ForegroundColor White
try {
    $firebaseVersion = firebase --version 2>$null
    if ($firebaseVersion) {
        Show-Success "Firebase CLI ya instalado: $firebaseVersion"
    } else {
        Show-Warning "Firebase CLI no encontrado. Instalando..."
        npm install -g firebase-tools
        if ($LASTEXITCODE -eq 0) {
            Show-Success "Firebase CLI instalado exitosamente"
        } else {
            Show-Error "Error al instalar Firebase CLI"
            exit 1
        }
    }
} catch {
    Show-Warning "Firebase CLI no encontrado. Instalando..."
    npm install -g firebase-tools
    if ($LASTEXITCODE -ne 0) {
        Show-Error "No se pudo instalar Firebase CLI"
        exit 1
    }
}

# Instalar dependencias del proyecto
Write-Host ""
Write-Host "Instalando dependencias del proyecto..." -ForegroundColor White
npm install
if ($LASTEXITCODE -eq 0) {
    Show-Success "Dependencias instaladas"
} else {
    Show-Error "Error al instalar dependencias"
    exit 1
}

# Login en Firebase
Write-Host ""
Write-Host "Autenticación con Firebase..." -ForegroundColor White
Write-Host "Se abrirá el navegador para autenticarte." -ForegroundColor Yellow
Read-Host "Presiona Enter para continuar..."
firebase login
if ($LASTEXITCODE -eq 0) {
    Show-Success "Autenticado exitosamente"
} else {
    Show-Error "Error en la autenticación"
    exit 1
}

# Seleccionar proyecto
Write-Host ""
Write-Host "Proyectos disponibles:" -ForegroundColor White
firebase projects:list

Write-Host ""
Write-Host "Selecciona el entorno a configurar:" -ForegroundColor Yellow
Write-Host "1) Desarrollo (cloution-website)"
Write-Host "2) Staging (cloution-website-staging)"
Write-Host "3) Producción (cloution-website-prod)"
$env_choice = Read-Host "Opción (1-3)"

switch ($env_choice) {
    "1" {
        firebase use default
        Show-Success "Configurado para: Desarrollo"
    }
    "2" {
        firebase use staging
        Show-Success "Configurado para: Staging"
    }
    "3" {
        firebase use production
        Show-Success "Configurado para: Producción"
    }
    default {
        Show-Error "Opción inválida"
        exit 1
    }
}

# Build del proyecto
Write-Host ""
$build_choice = Read-Host "¿Deseas hacer build del proyecto ahora? (s/n)"
if ($build_choice -eq "s" -or $build_choice -eq "S") {
    Write-Host "Construyendo proyecto..." -ForegroundColor White
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Show-Success "Build completado"
    } else {
        Show-Error "Error en el build"
        exit 1
    }
}

# Deploy
Write-Host ""
$deploy_choice = Read-Host "¿Deseas hacer deploy ahora? (s/n)"
if ($deploy_choice -eq "s" -or $deploy_choice -eq "S") {
    Write-Host "Desplegando a Firebase Hosting..." -ForegroundColor White

    switch ($env_choice) {
        "1" {
            npm run deploy:staging
        }
        "2" {
            npm run deploy:staging
        }
        "3" {
            $prod_confirm = Read-Host "¿Estás SEGURO de desplegar a PRODUCCIÓN? (escribe 'SI')"
            if ($prod_confirm -eq "SI") {
                npm run deploy:production
            } else {
                Show-Warning "Deploy a producción cancelado"
            }
        }
    }

    if ($LASTEXITCODE -eq 0) {
        Show-Success "Deploy completado exitosamente"
        Write-Host ""
        Write-Host "URLs del proyecto:" -ForegroundColor White
        firebase hosting:sites
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "               SETUP COMPLETADO                  " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Comandos útiles:" -ForegroundColor Yellow
Write-Host "  npm run dev                - Desarrollo local"
Write-Host "  npm run build              - Build de producción"
Write-Host "  npm run deploy:staging     - Deploy a staging"
Write-Host "  npm run deploy:preview     - Preview temporal"
Write-Host "  npm run firebase:emulators - Emulador local"
Write-Host ""
Write-Host "Documentación completa en: docs/FIREBASE_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
