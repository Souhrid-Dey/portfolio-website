'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Wireframe } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function TransitionCore() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
      
      // Animate scale on mount
      const targetScale = 1;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.05);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.05);
    }
    
    if (materialRef.current) {
      // Pulse opacity
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[0.1, 0.1, 0.1]}>
        <icosahedronGeometry args={[5, 1]} />
        <meshBasicMaterial 
          ref={materialRef}
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0}
        />
      </mesh>
    </Float>
  );
}

export default function SceneTransition3D() {
  const [isVisible, setIsVisible] = useState(true);

  // Fade out the 3D element after the transition is complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Hide after 1.5s
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease-out'
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <TransitionCore />
      </Canvas>
    </div>
  );
}
