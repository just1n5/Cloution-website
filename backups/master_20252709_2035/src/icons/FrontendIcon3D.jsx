import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export const DEFAULTS = {
  roughness: 0.4,
  metalness: 0.05,
  rotationSpeed: 0.15,
};

const Material = ({
  color = "#9AE6FF",
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
 * Frontend Icon - Browser window with UI elements
 * Low-poly browser interface with code brackets
 */
export default function FrontendIcon3D({
  color = "#9AE6FF",
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
  const codeRef = useRef(null);

  useFrame((state, dt) => {
    if (groupRef.current && rotationSpeed) {
      groupRef.current.rotation.y += dt * rotationSpeed;
    }
    // Subtle code animation
    if (codeRef.current) {
      const time = state.clock.elapsedTime;
      codeRef.current.position.z = 0.055 + Math.sin(time * 2) * 0.005;
    }
  });

  return (
    <group ref={groupRef} scale={scale} rotation={rotation}>
      {/* Browser window frame */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.9, 0.65, 0.1]} />
        <Material
          color={color}
          emissive={emissive}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Window content area (recessed) */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0, -0.05, 0.051]}
      >
        <boxGeometry args={[0.84, 0.52, 0.01]} />
        <meshStandardMaterial color="#1e2936" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Top bar */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0, 0.265, 0.051]}
      >
        <boxGeometry args={[0.84, 0.08, 0.01]} />
        <Material
          color={color}
          emissive={emissive}
          roughness={roughness * 0.9}
          metalness={metalness * 1.1}
        />
      </mesh>

      {/* Window controls (Mac style) */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[-0.35, 0.265, 0.057]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.008, 6]} />
        <meshStandardMaterial
          color="#ff5f57"
          roughness={0.3}
          metalness={0.5}
          emissive="#ff5f57"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[-0.31, 0.265, 0.057]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.008, 6]} />
        <meshStandardMaterial
          color="#ffbd2e"
          roughness={0.3}
          metalness={0.5}
          emissive="#ffbd2e"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[-0.27, 0.265, 0.057]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.008, 6]} />
        <meshStandardMaterial
          color="#28ca42"
          roughness={0.3}
          metalness={0.5}
          emissive="#28ca42"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* URL bar */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0.05, 0.265, 0.057]}
      >
        <boxGeometry args={[0.4, 0.04, 0.005]} />
        <meshStandardMaterial color="#2a3f5f" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Main content panes */}
      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[-0.22, 0.02, 0.056]}
      >
        <boxGeometry args={[0.35, 0.35, 0.005]} />
        <Material
          color="#E6ECFF"
          emissive="#E6ECFF"
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        position={[0.22, 0.05, 0.056]}
      >
        <boxGeometry args={[0.35, 0.25, 0.005]} />
        <Material
          color="#E6ECFF"
          emissive="#E6ECFF"
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Code brackets <> */}
      <group ref={codeRef}>
        {/* Left bracket < */}
        <mesh
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[-0.08, -0.15, 0.055]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <Material
            color="#FFFFFF"
            emissive="#FFFFFF"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        <mesh
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[-0.08, -0.19, 0.055]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <Material
            color="#FFFFFF"
            emissive="#FFFFFF"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Right bracket > */}
        <mesh
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[0.08, -0.15, 0.055]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <Material
            color="#FFFFFF"
            emissive="#FFFFFF"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        <mesh
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[0.08, -0.19, 0.055]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <boxGeometry args={[0.08, 0.015, 0.01]} />
          <Material
            color="#FFFFFF"
            emissive="#FFFFFF"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* UI elements in panes */}
      {quality === "med" && (
        <>
          {/* Navigation menu items */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={`nav-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[-0.22, 0.12 - i * 0.06, 0.058]}
            >
              <boxGeometry args={[0.25, 0.025, 0.003]} />
              <meshStandardMaterial
                color="#667eea"
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>
          ))}

          {/* Content blocks */}
          <mesh
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            position={[0.22, 0.08, 0.058]}
          >
            <boxGeometry args={[0.28, 0.08, 0.003]} />
            <meshStandardMaterial
              color="#667eea"
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>

          {/* Button group */}
          {[0, 1].map((i) => (
            <mesh
              key={`btn-${i}`}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
              position={[0.15 + i * 0.14, -0.05, 0.058]}
            >
              <boxGeometry args={[0.1, 0.04, 0.003]} />
              <meshStandardMaterial
                color="#48bb78"
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}
