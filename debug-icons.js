// 🚀 SOLUCIÓN RÁPIDA SI HAY ERRORES

// Si ves errores en la consola, ejecuta esto paso a paso:

// 1. Verificar que las dependencias estén instaladas
console.log('Verificando dependencias Three.js...')
try {
  const fiber = require('@react-three/fiber')
  const drei = require('@react-three/drei')
  console.log('✅ Dependencies OK')
} catch (e) {
  console.log('❌ Need to install dependencies')
}

// 2. Test rápido de importación
console.log('Testing imports...')
try {
  // Esto debería funcionar sin errores
  import('./icons/planets/index.js').then(module => {
    console.log('✅ Icons loaded successfully:', Object.keys(module))
  }).catch(err => {
    console.log('❌ Import error:', err.message)
  })
} catch (e) {
  console.log('❌ Import failed:', e.message)
}

// 3. Verificar archivos creados
console.log('Checking files...')
console.log('Icons should be in: src/icons/planets/')

// COMANDOS PARA TERMINAL SI ES NECESARIO:
// npm install @react-three/fiber @react-three/drei three
// npm run dev