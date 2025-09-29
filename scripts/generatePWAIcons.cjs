// Script para generar iconos PWA placeholder
// Estos deben ser reemplazados con iconos reales del logo de Cloution

const fs = require('fs');
const path = require('path');

// Crear directorio de iconos si no existe
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG placeholder para los iconos
const generatePlaceholderSVG = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#grad)" rx="20" />
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}px" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">C</text>
  </svg>`;
};

// Tamaños requeridos para PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Mensaje para el usuario
console.log('⚠️  IMPORTANTE: Estos son iconos placeholder.');
console.log('📸 Debes generar iconos reales a partir del logo de Cloution.');
console.log('🔧 Herramientas recomendadas:');
console.log('   - https://realfavicongenerator.net/');
console.log('   - https://www.pwabuilder.com/imageGenerator');
console.log('   - https://maskable.app/');
console.log('');
console.log('Generando SVG placeholders en: public/icons/');
console.log('');

// Generar archivos SVG placeholder
sizes.forEach(size => {
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  const svgContent = generatePlaceholderSVG(size);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`✅ Creado: ${filename}`);
});

// Crear también iconos específicos para shortcuts
const shortcuts = [
  { name: 'portfolio', color: '#10b981' },
  { name: 'services', color: '#f59e0b' },
  { name: 'contact', color: '#ef4444' }
];

shortcuts.forEach(({ name, color }) => {
  const filename = `${name}-96x96.svg`;
  const filepath = path.join(iconsDir, filename);
  const svgContent = `<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" fill="${color}" rx="20" />
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40px" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${name[0].toUpperCase()}</text>
  </svg>`;
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`✅ Creado: ${filename}`);
});

console.log('');
console.log('✅ Iconos placeholder creados exitosamente.');
console.log('');
console.log('Próximos pasos:');
console.log('1. Convierte estos SVG a PNG usando una herramienta online');
console.log('2. O mejor aún, genera iconos profesionales desde el logo original');
console.log('3. Asegúrate de que los iconos sean "maskable" para Android');
