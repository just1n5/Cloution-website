import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
}

const Material = ({
  color = '#2EE6C5',
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
 * UX/UI Icon - Tablet/Monitor with UI elements
 * Low-poly display device with interface elements
 */
export default function UxUiIcon3D({
  color = '#2EE6C5',
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
  const cursorRef = useRef(null)
  
  useFrame((state, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed
    }
    // Animate cursor movement
    if (cursorRef.current) {
      const time = state.clock.elapsedTime
      cursorRef.current.position.x = Math.sin(time) * 0.15
      cursorRef.current.position.y = Math.cos(time * 1.3) * 0.1
    }
  })
  
  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      {/* Monitor frame/bezel */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.08]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* Screen (recessed) */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0.041]}>
        <boxGeometry args={[0.82, 0.52, 0.01]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.1} />
      </mesh>
      
      {/* Top bar with window controls */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.21, 0.045]}>
        <boxGeometry args={[0.82, 0.06, 0.005]} />
        <Material color={color} emissive={emissive} roughness={roughness * 0.8} metalness={metalness * 1.2} />
      </mesh>
      
      {/* Window control buttons (Mac style) */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.35, 0.21, 0.048]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 6]} />
        <meshStandardMaterial color="#ff5f57" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.31, 0.21, 0.048]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 6]} />
        <meshStandardMaterial color="#ffbd2e" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.27, 0.21, 0.048]}>
        <cylinderGeometry args={[0.015, 0.015, 0.005, 6]} />
        <meshStandardMaterial color="#28ca42" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* UI Card 1 */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.2, 0.05, 0.046]}>
        <boxGeometry args={[0.35, 0.2, 0.005]} />
        <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* UI Card 2 */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.2, -0.05, 0.046]}>
        <boxGeometry args={[0.35, 0.25, 0.005]} />
        <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.3} />
      </mesh>
      
      {/* Small UI elements */}
      {quality === 'med' && (
        <>
          {/* Button row */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={`button-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[-0.2 + i * 0.12, -0.15, 0.047]}
            >
              <boxGeometry args={[0.08, 0.03, 0.003]} />
              <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.15} metalness={0.4} />
            </mesh>
          ))}
          
          {/* Text lines (abstract) */}
          {[0, 1].map((i) => (
            <mesh
              key={`text-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[-0.15, 0.08 - i * 0.03, 0.047]}
            >
              <boxGeometry args={[0.25, 0.01, 0.002]} />
              <meshStandardMaterial color="#666" roughness={0.5} metalness={0.1} />
            </mesh>
          ))}
        </>
      )}
      
      {/* Cursor pointer (animated) */}
      <group ref={cursorRef} position={[0, 0, 0.05]}>
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.04, 0.06, 3]} />
          <Material color="#FFFFFF" emissive="#FFFFFF" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>
      
      {/* Stand base */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness * 1.5} />
      </mesh>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.04, 8]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness * 1.5} />
      </mesh>
    </group>
  )
}
