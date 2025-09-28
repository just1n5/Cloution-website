# 🎨 3D Icons Documentation - Cloution Solar System

## Overview
This collection contains 7 low-poly 3D icons representing Cloution's technological capabilities for use in a solar system visualization.

## Installation

Ensure you have the required dependencies:
```bash
npm install three @react-three/fiber @react-three/drei
```

## Icon Collection

### 1. AI & Data Icon (`AiDataIcon3D`)
- **Design**: Circuit board/chip with brain-like traces
- **Default Color**: `#7C6FF0` (Violet)
- **Poly Count**: ~800-1200 tris
- **Features**: Pins, circuit traces, central dome

### 2. Cloud & DevOps Icon (`CloudDevOpsIcon3D`)
- **Design**: Cloud formation with CI/CD ring
- **Default Color**: `#3BA3FF` (Blue)
- **Poly Count**: ~600-1000 tris
- **Features**: Overlapping spheres, orbital ring animation

### 3. APIs & Automation Icon (`ApisAutomationIcon3D`)
- **Design**: Gear with Saturn-like ring
- **Default Color**: `#5CE1E6` (Turquoise)
- **Poly Count**: ~700-1100 tris
- **Features**: 12 teeth gear, dual rings, rotation animation

### 4. UX/UI Icon (`UxUiIcon3D`)
- **Design**: Monitor/tablet with UI elements
- **Default Color**: `#2EE6C5` (Green-aqua)
- **Poly Count**: ~800-1200 tris
- **Features**: Window controls, UI cards, animated cursor

### 5. Backend Icon (`BackendIcon3D`)
- **Design**: Three stacked architectural layers
- **Default Color**: `#93A5FD` (Lavender)
- **Poly Count**: ~700-1100 tris
- **Features**: Floating layers, connection nodes, separators

### 6. Frontend Icon (`FrontendIcon3D`)
- **Design**: Browser window with code brackets
- **Default Color**: `#9AE6FF` (Sky blue)
- **Poly Count**: ~800-1200 tris
- **Features**: Mac-style controls, code brackets `<>`, UI panes

### 7. Security Icon (`SecurityIcon3D`)
- **Design**: Shield with energy field
- **Default Color**: `#3D5A80` (Dark blue)
- **Poly Count**: ~900-1300 tris
- **Features**: Lock icon, energy halo, pulse animation

## Common Props

All icons accept the following props:

```typescript
type PlanetIconProps = {
  color?: string              // Main color (hex)
  emissive?: string          // Glow color (hex)
  roughness?: number         // Material roughness (0-1, default: 0.4)
  metalness?: number         // Material metalness (0-1, default: 0.05)
  scale?: number | [x,y,z]   // Scale factor
  rotation?: [x,y,z]         // Initial rotation in radians
  rotationSpeed?: number     // Idle rotation speed (rad/s, default: 0.15)
  castShadow?: boolean       // Enable shadow casting
  receiveShadow?: boolean    // Enable shadow receiving
  quality?: 'low' | 'med'    // Detail level (affects poly count)
}
```

## Basic Usage

### Single Icon
```tsx
import { Canvas } from '@react-three/fiber'
import { AiDataIcon3D } from '@/icons'

function App() {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} />
      <AiDataIcon3D 
        color="#7C6FF0"
        rotationSpeed={0.2}
        scale={1.2}
      />
    </Canvas>
  )
}
```

### Complete Solar System
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as Icons from '@/icons'

function SolarSystem() {
  const planets = [
    { Component: Icons.AiDataIcon3D, orbit: 2, speed: 0.5, color: Icons.ICON_COLORS.AiData },
    { Component: Icons.CloudDevOpsIcon3D, orbit: 3, speed: 0.4, color: Icons.ICON_COLORS.CloudDevOps },
    { Component: Icons.ApisAutomationIcon3D, orbit: 4, speed: 0.3, color: Icons.ICON_COLORS.ApisAutomation },
    { Component: Icons.UxUiIcon3D, orbit: 5, speed: 0.35, color: Icons.ICON_COLORS.UxUi },
    { Component: Icons.BackendIcon3D, orbit: 6, speed: 0.25, color: Icons.ICON_COLORS.Backend },
    { Component: Icons.FrontendIcon3D, orbit: 7, speed: 0.28, color: Icons.ICON_COLORS.Frontend },
    { Component: Icons.SecurityIcon3D, orbit: 8, speed: 0.2, color: Icons.ICON_COLORS.Security },
  ]

  return (
    <Canvas camera={{ position: [0, 10, 15], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <OrbitControls enablePan={false} />
      
      {/* Central sun - Cloution Core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Planets */}
      {planets.map((planet, i) => (
        <PlanetOrbit key={i} {...planet} />
      ))}
    </Canvas>
  )
}

function PlanetOrbit({ Component, orbit, speed, color }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * orbit
    ref.current.position.z = Math.sin(t) * orbit
  })
  
  return (
    <group ref={ref}>
      <Component 
        color={color}
        scale={0.8}
        rotationSpeed={0.3}
        quality="med"
        castShadow
        receiveShadow
      />
    </group>
  )
}
```

### With Custom Animation
```tsx
import { useFrame } from '@react-three/fiber'
import { BackendIcon3D } from '@/icons'
import { useRef } from 'react'

function AnimatedIcon() {
  const iconRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    iconRef.current.position.y = Math.sin(t) * 0.5
    iconRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
  })
  
  return (
    <BackendIcon3D 
      ref={iconRef}
      color="#93A5FD"
      emissive="#93A5FD"
      rotationSpeed={0}  // Disable default rotation
      quality="med"
    />
  )
}
```

### Performance Optimization
```tsx
// Use 'low' quality for better performance with many icons
<ApisAutomationIcon3D quality="low" />

// Disable shadows for better performance
<CloudDevOpsIcon3D castShadow={false} receiveShadow={false} />

// Static icon (no rotation)
<SecurityIcon3D rotationSpeed={0} />
```

## Styling Examples

### Glowing Effect
```tsx
<FrontendIcon3D 
  color="#9AE6FF"
  emissive="#9AE6FF"  // Same as color for strong glow
  metalness={0.8}      // High metalness for shine
  roughness={0.1}      // Low roughness for smoothness
/>
```

### Matte Finish
```tsx
<UxUiIcon3D 
  color="#2EE6C5"
  roughness={0.8}      // High roughness
  metalness={0}        // No metalness
/>
```

### Dark Theme
```tsx
<SecurityIcon3D 
  color="#1a1a2e"      // Dark color
  emissive="#3D5A80"   // Subtle blue glow
  roughness={0.6}
  metalness={0.2}
/>
```

## Integration with About Section

```tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as Icons from '@/icons'

function AboutSection() {
  return (
    <section className="relative min-h-screen">
      <div className="container mx-auto grid grid-cols-2 gap-8">
        {/* Text Content */}
        <div className="space-y-6">
          <h2>Quiénes Somos</h2>
          <p>En Cloution, transformamos ideas en soluciones...</p>
        </div>
        
        {/* 3D Solar System */}
        <div className="h-[600px] bg-gray-900 rounded-lg overflow-hidden">
          <Suspense fallback={<div>Loading 3D...</div>}>
            <Canvas>
              <SolarSystem />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  )
}
```

## Troubleshooting

### Icon not appearing
- Check camera position and FOV
- Ensure lights are added to the scene
- Verify scale is not 0

### Performance issues
- Use `quality="low"` for multiple icons
- Disable shadows
- Reduce `rotationSpeed` or set to 0
- Use `<Suspense>` for lazy loading

### TypeScript errors
```tsx
// Import types explicitly
import type { PlanetIconProps } from '@/icons'

// Use with custom components
const MyIcon: React.FC<PlanetIconProps> = (props) => {
  return <AiDataIcon3D {...props} />
}
```

## License
These 3D icons are created specifically for Cloution and are free for commercial use within the Cloution project.

## Credits
- Design: Cloution Development Team
- Technology: Three.js, React Three Fiber
- Style: Flat 3D, Low-poly minimalist

---

**Version**: 1.0.0  
**Last Updated**: December 2024
