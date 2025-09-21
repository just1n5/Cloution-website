import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
}

const Material = ({
  color = '#3D5A80',
  emissive,
  roughness = DEFAULTS.roughness,
  metalness = DEFAULTS.metalness,
}) => (
  <meshStandardMaterial 
    color={color} 
    emissive={emissive ?? '#000'} 
    emissiveIntensity={emissive ? 0.4 : 0} 
    roughness={roughness} 
    metalness={metalness} 
  />
)

/**
 * Security Icon - Shield with energy field
 * Low-poly shield with optional protective halo
 */
export default function SecurityIcon3D({
  color = '#3D5A80',
  emissive,
  scale = 1,
  rotation = [0, 0, 0],
  rotationSpeed = DEFAULTS.rotationSpeed,
  castShadow = false,
  receiveShadow = false,
  roughness = DEFAULTS.roughness,
  metalness = DEFAULTS.metalness,
  quality = 'med'
}) {
  const groupRef = useRef(null)
  const shieldRef = useRef(null)
  const haloRef = useRef(null)
  
  useFrame((state, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed
    }
    // Shield pulse effect
    if (shieldRef.current) {
      const time = state.clock.elapsedTime
      shieldRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02)
    }
    // Halo rotation and pulse
    if (haloRef.current) {
      const time = state.clock.elapsedTime
      haloRef.current.rotation.y += dt * 0.5
      const material = haloRef.current.material
      material.opacity = 0.12 + Math.sin(time * 3) * 0.03
    }
  })
  
  // Create shield shape
  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Shield path (symmetrical)
    shape.moveTo(0, 0.5) // Top center
    shape.quadraticCurveTo(0.35, 0.45, 0.35, 0.2) // Right curve
    shape.lineTo(0.35, -0.1) // Right side
    shape.quadraticCurveTo(0.35, -0.3, 0, -0.5) // Bottom point
    shape.quadraticCurveTo(-0.35, -0.3, -0.35, -0.1) // Left bottom
    shape.lineTo(-0.35, 0.2) // Left side
    shape.quadraticCurveTo(-0.35, 0.45, 0, 0.5) // Back to top
    
    return shape
  }, [])
  
  const extrudeSettings = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: quality === 'low' ? 1 : 2,
    bevelSize: 0.02,
    bevelThickness: 0.01,
  }
  
  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      {/* Main shield body */}
      <mesh ref={shieldRef} castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0]}>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* Inner shield detail/crest */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0.065]} scale={[0.85, 0.85, 1]}>
        <extrudeGeometry 
          args={[
            shieldShape, 
            {
              ...extrudeSettings,
              depth: 0.02,
              bevelSize: 0.01,
            }
          ]} 
        />
        <meshStandardMaterial 
          color="#E6ECFF" 
          emissive="#E6ECFF" 
          emissiveIntensity={0.3}
          roughness={0.2} 
          metalness={0.7} 
        />
      </mesh>
      
      {/* Central lock icon */}
      <group position={[0, 0, 0.08]}>
        {/* Lock body */}
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -0.05, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.15} metalness={0.8} />
        </mesh>
        
        {/* Lock shackle */}
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 3, quality === 'low' ? 8 : 12, Math.PI]} />
          <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.15} metalness={0.8} />
        </mesh>
        
        {/* Keyhole */}
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -0.05, 0.011]}>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 6]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Energy field/halo (optional, parametrizable) */}
      <mesh ref={haloRef} castShadow={false} receiveShadow={false} position={[0, 0, 0]}>
        <sphereGeometry args={[0.65, quality === 'low' ? 16 : 24, quality === 'low' ? 16 : 24]} />
        <meshStandardMaterial 
          color="#E6ECFF"
          emissive="#E6ECFF"
          emissiveIntensity={0.6}
          transparent={true}
          opacity={0.12}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Additional detail lines */}
      {quality === 'med' && (
        <>
          {/* Top accent */}
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.35, 0.07]}>
            <boxGeometry args={[0.4, 0.02, 0.01]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
          </mesh>
          
          {/* Side accents */}
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.2, 0.1, 0.07]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.15, 0.02, 0.01]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
          </mesh>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.2, 0.1, 0.07]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.15, 0.02, 0.01]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
          </mesh>
        </>
      )}
    </group>
  )
}
