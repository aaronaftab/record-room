import React from 'react';
import * as THREE from 'three';

interface WindowViewProps {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
}

export const WindowView = ({ position, rotation, size }: WindowViewProps) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={size} />
        <meshPhysicalMaterial 
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          metalness={0}
          ior={1.52}
          transparent={true}
          opacity={1}
          side={THREE.DoubleSide}
          clearcoat={0.1}
          clearcoatRoughness={0.1}
          attenuationColor={new THREE.Color(0.95, 0.95, 1)}
          attenuationDistance={0.5}
        />
      </mesh>
    </group>
  );
};