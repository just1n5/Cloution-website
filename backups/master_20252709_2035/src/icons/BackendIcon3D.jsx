import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
}

const Material = ({
  color = '#93A5FD',
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
 * Backend Icon - Stacked layers architecture
 * Low-poly representation of backend infrastructure layers
 */
export default function BackendIcon3D({
  color = '#93A5FD',
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
  const layersRef = useRef(null)
  
  useFrame((state, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed
    }
    // Subtle floating animation for layers
    if (layersRef.current) {
      const time = state.clock.elapsedTime
      layersRef.current.children.forEach((layer, i) => {
        layer.position.y = (i * 0.28) - 0.28 + Math.sin(time + i * 0.5) * 0.02
      })
    }
  })
  
  const layerOffsets = quality === 'med' 
    ? [[0, 0, 0], [0.08, 0, -0.08], [-0.08, 0, 0.08]] 
    : [[0, 0, 0], [0.06, 0, -0.06], [-0.06, 0, 0.06]]
  
  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      <group ref={layersRef}>
        {/* Bottom layer - Database/Storage */}
        <group position={[layerOffsets[0][0], -0.28, layerOffsets[0][2]]}>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow}>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <Material color={color} emissive={emissive} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Layer separator */}
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.11, 0]}>
            <boxGeometry args={[0.82, 0.02, 0.82]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
          </mesh>
          {/* Detail elements */}
          {quality === 'med' && (
            <>
              <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.25, 0, 0.25]}>
                <cylinderGeometry args={[0.06, 0.06, 0.19, 6]} />
                <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.3} metalness={0.6} />
              </mesh>
              <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.25, 0, -0.25]}>
                <cylinderGeometry args={[0.06, 0.06, 0.19, 6]} />
                <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.3} metalness={0.6} />
              </mesh>
            </>
          )}
        </group>
        
        {/* Middle layer - Business Logic */}
        <group position={[layerOffsets[1][0], 0, layerOffsets[1][2]]}>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow}>
            <boxGeometry args={[0.7, 0.2, 0.7]} />
            <Material color={color} emissive={emissive} roughness={roughness * 0.9} metalness={metalness * 1.1} />
          </mesh>
          {/* Layer separator */}
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.11, 0]}>
            <boxGeometry args={[0.72, 0.02, 0.72]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.7} />
          </mesh>
          {/* Connection nodes */}
          {quality === 'med' && (
            <>
              <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.2, 0, 0.2]}>
                <boxGeometry args={[0.1, 0.18, 0.1]} />
                <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.3} metalness={0.6} />
              </mesh>
              <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.2, 0, -0.2]}>
                <boxGeometry args={[0.1, 0.18, 0.1]} />
                <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.3} metalness={0.6} />
              </mesh>
            </>
          )}
        </group>
        
        {/* Top layer - API/Interface */}
        <group position={[layerOffsets[2][0], 0.28, layerOffsets[2][2]]}>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow}>
            <boxGeometry args={[0.6, 0.2, 0.6]} />
            <Material color={color} emissive={emissive} roughness={roughness * 0.8} metalness={metalness * 1.2} />
          </mesh>
          {/* API endpoints representation */}
          {[[-0.15, 0.11, 0.15], [0.15, 0.11, 0.15], [-0.15, 0.11, -0.15], [0.15, 0.11, -0.15]].map((pos, i) => (
            <mesh
              key={`endpoint-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={pos}
            >
              <cylinderGeometry args={[0.04, 0.04, 0.02, quality === 'low' ? 4 : 6]} />
              <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.15} metalness={0.8} />
            </mesh>
          ))}
        </group>
      </group>
      
      {/* Vertical connectors between layers */}
      {quality === 'med' && (
        <>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-0.2, 0, 0.2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 4]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0.2, 0, -0.2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 4]} />
            <Material color="#E6ECFF" emissive="#E6ECFF" roughness={0.2} metalness={0.8} />
          </mesh>
        </>
      )}
    </group>
  )
}
