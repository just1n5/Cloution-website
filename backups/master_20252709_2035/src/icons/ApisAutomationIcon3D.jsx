import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
}

const Material = ({
  color = '#5CE1E6',
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
 * APIs & Automation Icon - Gear with orbital ring
 * Low-poly gear with Saturn-like ring representing automated workflows
 */
export default function ApisAutomationIcon3D({
  color = '#5CE1E6',
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
  const gearRef = useRef(null)
  const ringRef = useRef(null)
  
  useFrame((_, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed
    }
    // Gear rotates slowly
    if (gearRef.current) {
      gearRef.current.rotation.z += dt * 0.2
    }
    // Ring wobbles slightly
    if (ringRef.current) {
      ringRef.current.rotation.y += dt * 0.1
      ringRef.current.rotation.x = 0.4 + Math.sin(Date.now() * 0.0005) * 0.05
    }
  })

  const teeth = quality === 'low' ? 8 : 12
  
  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      <group ref={gearRef}>
        {/* Central gear hub */}
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.25, quality === 'low' ? 8 : 12]} />
          <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
        </mesh>
        
        {/* Central hole */}
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.26, 6]} />
          <meshStandardMaterial color="#000000" roughness={0.8} metalness={0.1} />
        </mesh>
        
        {/* Gear teeth */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i / teeth) * Math.PI * 2
          const x = Math.cos(angle) * 0.35
          const z = Math.sin(angle) * 0.35
          
          return (
            <mesh
              key={`tooth-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.12, 0.24, 0.08]} />
              <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
            </mesh>
          )
        })}
        
        {/* Spokes connecting center to teeth (optional detail) */}
        {quality === 'med' && Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2
          const x = Math.cos(angle) * 0.15
          const z = Math.sin(angle) * 0.15
          
          return (
            <mesh
              key={`spoke-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.2, 0.22, 0.03]} />
              <Material color={color} emissive={emissive} roughness={roughness * 1.1} metalness={metalness * 0.9} />
            </mesh>
          )
        })}
      </group>
      
      {/* Saturn-like ring representing API connections/automation flows */}
      <mesh ref={ringRef} castShadow={castShadow} receiveShadow={receiveShadow} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.6, 0.04, 4, quality === 'low' ? 24 : 32]} />
        <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
      </mesh>
      
      {/* Additional detail ring (inner) */}
      {quality === 'med' && (
        <mesh castShadow={castShadow} receiveShadow={receiveShadow} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 3, 24]} />
          <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.3} metalness={0.6} />
        </mesh>
      )}
    </group>
  )
}
