#!/bin/bash

# 🔥 Script de Setup para Firebase - Cloution Website
# Este script configura Firebase Hosting para el proyecto

echo "================================================"
echo "   🔥 SETUP FIREBASE - CLOUTION WEBSITE 🔥    "
echo "================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
show_message() {
    echo -e "${GREEN}✓${NC} $1"
}

show_error() {
    echo -e "${RED}✗${NC} $1"
}

show_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verificar Node.js
echo "🔍 Verificando pre-requisitos..."
if ! command -v node &> /dev/null; then
    show_error "Node.js no está instalado. Por favor, instálalo primero."
    exit 1
fi
show_message "Node.js instalado: $(node --version)"

# Verificar NPM
if ! command -v npm &> /dev/null; then
    show_error "NPM no está instalado."
    exit 1
fi
show_message "NPM instalado: $(npm --version)"

# Instalar Firebase CLI si no existe
echo ""
echo "📦 Verificando Firebase CLI..."
if ! command -v firebase &> /dev/null; then
    show_warning "Firebase CLI no encontrado. Instalando..."
    npm install -g firebase-tools
    if [ $? -eq 0 ]; then
        show_message "Firebase CLI instalado exitosamente"
    else
        show_error "Error al instalar Firebase CLI"
        exit 1
    fi
else
    show_message "Firebase CLI ya instalado: $(firebase --version)"
fi

# Instalar dependencias del proyecto
echo ""
echo "📦 Instalando dependencias del proyecto..."
npm install
if [ $? -eq 0 ]; then
    show_message "Dependencias instaladas"
else
    show_error "Error al instalar dependencias"
    exit 1
fi

# Login en Firebase
echo ""
echo "🔐 Autenticación con Firebase..."
echo "Se abrirá el navegador para autenticarte."
read -p "Presiona Enter para continuar..."
firebase login
if [ $? -eq 0 ]; then
    show_message "Autenticado exitosamente"
else
    show_error "Error en la autenticación"
    exit 1
fi

# Seleccionar proyecto
echo ""
echo "📋 Proyectos disponibles:"
firebase projects:list

echo ""
echo "Selecciona el entorno a configurar:"
echo "1) Desarrollo (cloution-website)"
echo "2) Staging (cloution-website-staging)" 
echo "3) Producción (cloution-website-prod)"
read -p "Opción (1-3): " env_choice

case $env_choice in
    1)
        firebase use default
        show_message "Configurado para: Desarrollo"
        ;;
    2)
        firebase use staging
        show_message "Configurado para: Staging"
        ;;
    3)
        firebase use production
        show_message "Configurado para: Producción"
        ;;
    *)
        show_error "Opción inválida"
        exit 1
        ;;
esac

# Build del proyecto
echo ""
read -p "¿Deseas hacer build del proyecto ahora? (s/n): " build_choice
if [[ $build_choice == "s" || $build_choice == "S" ]]; then
    echo "🔨 Construyendo proyecto..."
    npm run build
    if [ $? -eq 0 ]; then
        show_message "Build completado"
    else
        show_error "Error en el build"
        exit 1
    fi
fi

# Deploy
echo ""
read -p "¿Deseas hacer deploy ahora? (s/n): " deploy_choice
if [[ $deploy_choice == "s" || $deploy_choice == "S" ]]; then
    echo "🚀 Desplegando a Firebase Hosting..."
    
    case $env_choice in
        1)
            npm run deploy:staging
            ;;
        2)
            npm run deploy:staging
            ;;
        3)
            read -p "⚠️ ¿Estás SEGURO de deployar a PRODUCCIÓN? (escribir 'SI'): " prod_confirm
            if [[ $prod_confirm == "SI" ]]; then
                npm run deploy:production
            else
                show_warning "Deploy a producción cancelado"
            fi
            ;;
    esac
    
    if [ $? -eq 0 ]; then
        show_message "Deploy completado exitosamente"
        echo ""
        echo "🌐 URLs del proyecto:"
        firebase hosting:sites
    fi
fi

echo ""
echo "================================================"
echo "         ✅ SETUP COMPLETADO                   "
echo "================================================"
echo ""
echo "📚 Comandos útiles:"
echo "  npm run dev              - Desarrollo local"
echo "  npm run build            - Build de producción"
echo "  npm run deploy:staging   - Deploy a staging"
echo "  npm run deploy:preview   - Preview temporal"
echo "  npm run firebase:emulators - Emulador local"
echo ""
echo "📖 Documentación completa en: docs/FIREBASE_DEPLOYMENT.md"
echo ""
