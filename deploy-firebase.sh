#!/bin/bash

echo "========================================"
echo "   DEPLOY A FIREBASE CON FORMULARIO"
echo "          CONFIGURADO"
echo "========================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ ERROR: Firebase CLI no está instalado${NC}"
    echo ""
    echo "Instálalo con: npm install -g firebase-tools"
    echo ""
    exit 1
fi

# Verificar el email en el código
echo "📧 Verificando configuración del formulario..."
if grep -q "contacto@cloution.com" "src/pages/PortfolioPage.jsx"; then
    echo ""
    echo -e "${YELLOW}⚠️  ADVERTENCIA: El email por defecto sigue en el código${NC}"
    echo "   Archivo: src/pages/PortfolioPage.jsx (línea 53)"
    echo "   Email actual: contacto@cloution.com"
    echo ""
    read -p "¿Deseas continuar con este email? (s/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo ""
        echo "📝 Para cambiar el email:"
        echo "   1. Edita src/pages/PortfolioPage.jsx línea 53"
        echo "   2. O ejecuta: ./configurar-formulario.sh tu-email@ejemplo.com"
        echo ""
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}✅ Configuración verificada${NC}"
echo ""

# Build del proyecto
echo "🔨 Construyendo proyecto para producción..."
npm run build
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ ERROR: Falló el build del proyecto${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build completado${NC}"
echo ""

# Verificar que existe la carpeta dist
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ ERROR: No se encontró la carpeta dist${NC}"
    echo "   Verifica que el build se haya completado correctamente"
    exit 1
fi

# Mostrar información del proyecto
echo "🔥 Información de Firebase:"
firebase projects:list

echo ""
echo "📦 Desplegando a Firebase Hosting..."
echo ""

# Deploy a Firebase
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo -e "   ${GREEN}✅ DEPLOY COMPLETADO CON ÉXITO${NC}"
    echo "========================================"
    echo ""
    echo "🎉 Tu sitio está disponible en:"
    firebase open hosting:site
    echo ""
    echo "📋 PRÓXIMOS PASOS:"
    echo ""
    echo "1. Navega a /portfolio en tu sitio"
    echo "2. Prueba el formulario de contacto"
    echo "3. Si es la primera vez con FormSubmit:"
    echo "   - Revisa tu email para verificación"
    echo "   - Haz clic en el enlace de activación"
    echo ""
    echo "🧪 Para verificar que todo funcione:"
    echo "   - Abre firebase-test.html en tu navegador"
    echo "   - O visita tu-sitio.web.app/portfolio"
    echo ""
else
    echo ""
    echo -e "${RED}❌ ERROR: Falló el deploy a Firebase${NC}"
    echo ""
    echo "Posibles soluciones:"
    echo "1. Verifica que estés logueado: firebase login"
    echo "2. Inicializa Firebase si es primera vez: firebase init"
    echo "3. Selecciona el proyecto correcto: firebase use [project-id]"
    echo ""
fi