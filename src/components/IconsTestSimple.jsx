import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Import directo de los iconos 3D desde la carpeta correcta
import AiDataIcon3D from '../icons/AiDataIcon3D'
import CloudDevOpsIcon3D from '../icons/CloudDevOpsIcon3D'
import SecurityIcon3D from '../icons/SecurityIcon3D'
import FrontendIcon3D from '../icons/FrontendIcon3D'
import BackendIcon3D from '../icons/BackendIcon3D'
import UxUiIcon3D from '../icons/UxUiIcon3D'
import ApisAutomationIcon3D from '../icons/ApisAutomationIcon3D'
import WordPressLogo from '../icons/WordPressLogo'
import ReactLogo from '../icons/ReactLogo'

// Todos los iconos disponibles en el sistema
const ICONS_TO_TEST = [
  { 
    Component: FrontendIcon3D, 
    name: 'Frontend', 
    color: '#60A5FA',
    description: 'Pantalla con capas de código y efectos visuales'
  },
  { 
    Component: BackendIcon3D, 
    name: 'Backend', 
    color: '#10B981',
    description: 'Servidor con flujo de datos y conexiones'
  },
  { 
    Component: CloudDevOpsIcon3D, 
    name: 'Cloud & DevOps', 
    color: '#3BA3FF',
    description: 'Nube con anillos orbitales CI/CD'
  },
  { 
    Component: SecurityIcon3D, 
    name: 'Security', 
    color: '#EF4444',
    description: 'Escudo protector con campo de fuerza'
  },
  { 
    Component: AiDataIcon3D, 
    name: 'AI & Data', 
    color: '#8B5CF6',
    description: 'Chip neuronal con circuitos y conexiones'
  },
  { 
    Component: UxUiIcon3D, 
    name: 'UX/UI', 
    color: '#EC4899',
    description: 'Pantallas con paleta de colores y diseño'
  },
  { 
    Component: ApisAutomationIcon3D, 
    name: 'APIs & Automation', 
    color: '#F97316',
    description: 'Engranajes sincronizados y conectores'
  },
  { 
    Component: WordPressLogo, 
    name: 'WordPress', 
    color: '#0073AA',
    description: 'Logo WordPress 3D animado con partículas'
  },
  { 
    Component: ReactLogo, 
    name: 'React', 
    color: '#61DAFB',
    description: 'Átomo React con órbitas de electrones'
  },
]

export default function IconsTestSimple() {
  const [selectedIcon, setSelectedIcon] = useState(0)

  const currentIcon = ICONS_TO_TEST[selectedIcon]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Header simple */}
      <div className="p-6 bg-black/80 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">🚀 Cloution 3D Icons - Sistema Completo</h1>
          <a 
            href="/" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            ← Volver al sitio
          </a>
        </div>
        <p className="text-gray-300 mb-4">Visualizador de todos los iconos 3D del sistema</p>
        
        <div className="flex flex-wrap gap-2">
          {ICONS_TO_TEST.map((icon, index) => (
            <button
              key={index}
              onClick={() => setSelectedIcon(index)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedIcon === index ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              style={{ borderLeft: `4px solid ${icon.color}` }}
            >
              {icon.name}
            </button>
          ))}
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4" style={{ color: currentIcon.color }}>
              {currentIcon.name}
            </h2>
            <div className="space-y-3 text-gray-300">
              <p><strong>Descripción:</strong> {currentIcon.description}</p>
              <p><strong>Color:</strong> <span className="font-mono">{currentIcon.color}</span></p>
              <p><strong>Estado:</strong> ✅ Funcionando</p>
              <p><strong>Performance:</strong> Optimizado para web</p>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded text-sm">
              <h3 className="font-bold mb-2">Código de ejemplo:</h3>
              <pre className="font-mono text-xs text-green-400">
{`<${currentIcon.Component.name || 'Icon3D'}
  color="${currentIcon.color}"
  rotationSpeed={0.15}
  scale={1}
/>`}
              </pre>
            </div>
          </div>
          
          {/* Vista 3D */}
          <div className="h-96 lg:h-full bg-black/20 rounded-lg border border-white/10 overflow-hidden">
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Cargando icono 3D...</p>
                  </div>
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                shadows
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.3} />
                <directionalLight 
                  position={[3, 3, 3]} 
                  intensity={0.7}
                  castShadow
                />
                
                <currentIcon.Component
                  color={currentIcon.color}
                  emissive={currentIcon.color}
                  rotationSpeed={0.15}
                  scale={1.2}
                  castShadow
                  receiveShadow
                />
                
                <OrbitControls 
                  enableZoom
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1}
                />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer con instrucciones */}
      <div className="p-4 bg-black/60 text-center">
        <div className="text-sm text-gray-400 space-x-4">
          <span>🖱️ Arrastra para rotar</span>
          <span>🔍 Scroll para zoom</span>
          <span>✨ Rotación automática activa</span>
        </div>
      </div>
    </div>
  )
}
