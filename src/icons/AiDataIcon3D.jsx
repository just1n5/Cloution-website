import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
};

const Material = ({
  color = "#ff0000ff",
  emissive,
  roughness = DEFAULTS.roughness,
  metalness = DEFAULTS.metalness,
}) => (
  <meshStandardMaterial
    color={color}
    emissive={emissive ?? "#000"}
    emissiveIntensity={emissive ? 0.4 : 0}
    roughness={roughness}
    metalness={metalness}
  />
);

/**
 * AI & Data Icon - Chip/Brain Tech design
 * Low-poly circuit board with brain-like traces
 */
export default function AiDataIcon3D({
  color = "#ff0000ff",
  emissive,
  scale = 1,
  rotation = [0, 0, 0],
  rotationSpeed = DEFAULTS.rotationSpeed,
  castShadow = false,
  receiveShadow = false,
  roughness = DEFAULTS.roughness,
  metalness = DEFAULTS.metalness,
  quality = "med",
}) {
  const groupRef = useRef(null);

  useFrame((_, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed;
    }
  });

  const pinRows = quality === "low" ? 4 : 6;
  const traceSegments = quality === "low" ? 3 : 5;

  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      {/* Base chip plate with rounded corners */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 0.15, 1]} />
        <Material
          color={color}
          emissive={emissive}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Central dome - brain core */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0, 0.1, 0]}
      >
        <sphereGeometry args={[0.25, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Material
          color={color}
          emissive={emissive}
          roughness={roughness * 0.8}
          metalness={metalness * 1.2}
        />
      </mesh>

      {/* Pins on left side */}
      {Array.from({ length: pinRows }).map((_, i) => (
        <mesh
          key={`pin-left-${i}`}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[-0.52, -0.05, -0.3 + i * 0.12]}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.1, 4]} />
          <Material
            color="#E6ECFF"
            emissive="#E6ECFF"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Pins on right side */}
      {Array.from({ length: pinRows }).map((_, i) => (
        <mesh
          key={`pin-right-${i}`}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[0.52, -0.05, -0.3 + i * 0.12]}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.1, 4]} />
          <Material
            color="#E6ECFF"
            emissive="#E6ECFF"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Circuit traces forming brain pattern */}
      {Array.from({ length: traceSegments }).map((_, i) => {
        const angle = (i / traceSegments) * Math.PI * 2;
        const radius = 0.15 + Math.random() * 0.1;
        return (
          <mesh
            key={`trace-${i}`}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            position={[
              Math.cos(angle) * radius,
              0.076,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.15, 0.01, 0.02]} />
            <Material
              color="#E6ECFF"
              emissive="#E6ECFF"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        );
      })}

      {/* Corner indicators */}
      {[
        [-0.4, -0.4],
        [0.4, -0.4],
        [-0.4, 0.4],
        [0.4, 0.4],
      ].map(([x, z], i) => (
        <mesh
          key={`corner-${i}`}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[x, 0.076, z]}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.01, 6]} />
          <Material
            color="#E6ECFF"
            emissive="#E6ECFF"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
