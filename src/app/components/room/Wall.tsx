import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { WindowView } from './WindowView';

interface WallProps {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  hasWindow?: boolean;
}

export const Wall = ({ position, rotation, size, hasWindow = false }: WallProps) => {
  const textures = useTexture({
    colorMap: '/textures/wood084/color.jpg',
    normalMap: '/textures/wood084/normal.jpg',
  });

  React.useEffect(() => {
    [textures.colorMap, textures.normalMap].forEach(texture => {
      if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.25, 0.25);
      }
    });
  }, [textures]);

  if (hasWindow) {
    const windowWidth = 6;  // Window width
    const windowHeight = 6;  // Window height
    const sideWidth = (size[0] - windowWidth) / 2;  // Width of side panels
    const topBottomHeight = (size[1] - windowHeight) / 2;  // Height of top/bottom panels

    return (
      <group position={position} rotation={rotation}>
        {/* Left wall section */}
        <mesh position={[-(windowWidth/2 + sideWidth/2), 0, 0]}>
          <planeGeometry args={[sideWidth, size[1]]} />
          <meshStandardMaterial 
            map={textures.colorMap}
            normalMap={textures.normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughness={0.7}
          />
        </mesh>

        {/* Right wall section */}
        <mesh position={[windowWidth/2 + sideWidth/2, 0, 0]}>
          <planeGeometry args={[sideWidth, size[1]]} />
          <meshStandardMaterial 
            map={textures.colorMap}
            normalMap={textures.normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughness={0.7}
          />
        </mesh>

        {/* Top wall section */}
        <mesh position={[0, windowHeight/2 + topBottomHeight/2, 0]}>
          <planeGeometry args={[windowWidth, topBottomHeight]} />
          <meshStandardMaterial 
            map={textures.colorMap}
            normalMap={textures.normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughness={0.7}
          />
        </mesh>

        {/* Bottom wall section */}
        <mesh position={[0, -(windowHeight/2 + topBottomHeight/2), 0]}>
          <planeGeometry args={[windowWidth, topBottomHeight]} />
          <meshStandardMaterial 
            map={textures.colorMap}
            normalMap={textures.normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughness={0.7}
          />
        </mesh>
        
        {/* Window section */}
        <WindowView 
          position={[0, 0, 0.02]} 
          rotation={[0, 0, 0]} 
          size={[windowWidth, windowHeight]}
        />
      </group>
    );
  }

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial 
        map={textures.colorMap}
        normalMap={textures.normalMap}
        normalScale={new THREE.Vector2(0.8, 0.8)}
        roughness={0.7}
      />
    </mesh>
  );
};
