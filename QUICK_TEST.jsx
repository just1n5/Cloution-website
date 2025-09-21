// CÓDIGO PARA PROBAR UN ICONO DIRECTAMENTE
// Agrega esto en Hero.jsx o cualquier componente

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import AiDataIcon3D from '../icons/planets/AiDataIcon3D.jsx'

// En el JSX, agrega:
<div className="w-32 h-32 mx-auto my-8">
  <Suspense fallback={<div>Loading...</div>}>
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.7} />
      
      <AiDataIcon3D 
        color="#7C6FF0"
        rotationSpeed={0.2}
      />
    </Canvas>
  </Suspense>
</div>

// ¡Deberías ver el icono girando inmediatamente!
