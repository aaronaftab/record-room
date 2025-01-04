import React, { useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { useThree } from '@react-three/fiber';
import { Floor } from './Floor';
import { Wall } from './Wall';
import { Ceiling } from './Ceiling';

export const Scene = () => {
  const { gl, scene } = useThree();

  useEffect(() => {
    // Set up renderer
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;

    // Load HDR environment
    const loader = new RGBELoader();
    loader.load('/textures/cityscapes/shanghai_bund_8k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });
  }, [gl, scene]);

  return (
    <>
      <Floor />
      <Wall 
        position={[0, 4, -4]} 
        rotation={[0, 0, 0]} 
        size={[10, 8]}
      />
      <Wall 
        position={[0, 4, 4]} 
        rotation={[0, Math.PI, 0]} 
        size={[10, 8]}
      />
      <Wall 
        position={[-5, 4, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        size={[8, 8]}
      />
      <Wall 
        position={[5, 4, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        size={[8, 8]}
        hasWindow={true}
      />
      <Ceiling />
      
      {/* Ambient light for base visibility */}
      <ambientLight intensity={0.1} />
    </>
  );
};