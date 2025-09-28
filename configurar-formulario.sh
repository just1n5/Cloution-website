#!/bin/bash

echo "========================================"
echo "  CONFIGURACION RAPIDA DE FORMULARIO"
echo "        CLOUTION PORTFOLIO"
echo "========================================"
echo ""

# Script para configurar rápidamente el email del formulario
# Uso: ./configurar-formulario.sh tu-email@ejemplo.com

EMAIL=$1

if [ -z "$EMAIL" ]; then
    echo "ERROR: Debes proporcionar un email"
    echo ""
    echo "Uso: ./configurar-formulario.sh tu-email@ejemplo.com"
    echo ""
    echo "Ejemplo: ./configurar-formulario.sh contacto@cloution.com"
    echo ""
    exit 1
fi

echo "Configurando formulario con email: $EMAIL"
echo ""

# Hacer backup del archivo original
echo "Creando backup del archivo original..."
cp src/pages/PortfolioPage.jsx src/pages/PortfolioPage.jsx.backup

# Actualizar el archivo con el nuevo email
echo "Actualizando email en PortfolioPage.jsx..."
sed -i "s|https://formsubmit.co/ajax/contacto@cloution.com|https://formsubmit.co/ajax/$EMAIL|g" src/pages/PortfolioPage.jsx

echo ""
echo "✅ Configuración completada!"
echo ""
echo "========================================"
echo "  PROXIMOS PASOS:"
echo "========================================"
echo ""
echo "1. Prueba el formulario localmente:"
echo "   npm run dev"
echo ""
echo "2. Navega a /portfolio y prueba el formulario"
echo ""
echo "3. La primera vez, FormSubmit te enviará un"
echo "   email de verificación a: $EMAIL"
echo ""
echo "4. Verifica tu email y activa FormSubmit"
echo ""
echo "5. Despliega los cambios:"
echo "   git add ."
echo "   git commit -m 'Actualizar email del formulario'"
echo "   git push"
echo ""
echo "========================================"
echo ""
echo "Si necesitas restaurar el backup:"
echo "cp src/pages/PortfolioPage.jsx.backup src/pages/PortfolioPage.jsx"
echo ""