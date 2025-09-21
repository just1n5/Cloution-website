#!/bin/bash
# Script de instalación y verificación para Cloution Website

echo "================================================"
echo "   Instalación de Cloution Website"
echo "================================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor, instala Node.js primero."
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js está instalado: $(node -v)"
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null
then
    echo "❌ npm no está instalado."
    exit 1
fi

echo "✅ npm está instalado: $(npm -v)"
echo ""

# Limpiar instalación anterior si existe
if [ -d "node_modules" ]; then
    echo "🧹 Limpiando instalación anterior..."
    rm -rf node_modules
    rm -f package-lock.json
fi

echo "📦 Instalando dependencias..."
echo ""

# Instalar dependencias
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ ¡Instalación completada exitosamente!"
    echo "================================================"
    echo ""
    echo "Para iniciar el proyecto, ejecuta:"
    echo "  npm run dev"
    echo ""
    echo "El sitio estará disponible en:"
    echo "  http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Error durante la instalación."
    echo "Por favor, intenta ejecutar manualmente:"
    echo "  npm install"
fi
