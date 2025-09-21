import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
}

const Material = ({
  color = '#3BA3FF',
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
 * Cloud & DevOps Icon - Cloud formation with CI/CD ring
 * Low-poly cloud made of overlapping spheres with orbital ring
 */
export default function CloudDevOpsIcon3D({
  color = '#3BA3FF',
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
  const ringRef = useRef(null)
  
  useFrame((_, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed
    }
    // Ring rotates in opposite direction for dynamic effect
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.3
      ringRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  const sphereSegments = quality === 'low' ? 8 : 12
  
  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      {/* Main cloud body - central sphere */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, sphereSegments, sphereSegments]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* Left cloud bump */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.3, -0.05, 0.1]}>
        <sphereGeometry args={[0.25, sphereSegments, sphereSegments]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* Right cloud bump */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.25, -0.05, 0.05]}>
        <sphereGeometry args={[0.28, sphereSegments, sphereSegments]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* Back cloud bump */}
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -0.08, -0.2]}>
        <sphereGeometry args={[0.22, sphereSegments, sphereSegments]} />
        <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
      </mesh>
      
      {/* CI/CD Ring - representing continuous integration/deployment */}
      <mesh ref={ringRef} castShadow={castShadow} receiveShadow={receiveShadow} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.55, 0.03, 3, quality === 'low' ? 16 : 24]} />
        <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Small detail spheres for cloud texture */}
      {quality === 'med' && (
        <>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.15, 0.1, 0.15]}>
            <sphereGeometry args={[0.12, 6, 6]} />
            <Material color={color} emissive={emissive} roughness={roughness * 1.2} metalness={metalness} />
          </mesh>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.15, 0.08, -0.1]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <Material color={color} emissive={emissive} roughness={roughness * 1.2} metalness={metalness} />
          </mesh>
        </>
      )}
    </group>
  )
}
