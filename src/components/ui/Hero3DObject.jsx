'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3DObject() {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);
  const linesRef = useRef(null);
  const sparksRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);
  const isMobileRef = useRef(false);
  
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleScroll = () => {
      scrollOffset.current = window.scrollY / (window.innerHeight || 1);
    };

    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const numPoints = 1500;
  const numSparks = 100;

  // Generate a procedural "Neural Network / Brain" shape using math
  const { basePositions, linesPositions, sparkPositions, randomOffsets } = useMemo(() => {
    const pos = new Float32Array(numPoints * 3);
    const lineCoords = [];
    const offsets = new Float32Array(numPoints); // For independent movement
    const sparks = new Float32Array(numSparks * 3);

    for (let i = 0; i < numPoints; i++) {
      // Golden ratio spiral on a sphere, modified into two hemispheres (like a brain)
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;

      // Base sphere coordinates
      let x = Math.cos(theta) * Math.sin(phi);
      let y = Math.cos(phi);
      let z = Math.sin(theta) * Math.sin(phi);

      // Squish and split into two hemispheres (brain lobes)
      x *= 1.2; // widen
      y *= 0.9; // flatten top
      z *= 1.4; // elongate front-to-back
      
      // Create the interhemispheric fissure (split down the middle)
      if (x > 0) x += 0.2;
      else x -= 0.2;

      // Add a bit of natural noise
      x += (Math.random() - 0.5) * 0.1;
      y += (Math.random() - 0.5) * 0.1;
      z += (Math.random() - 0.5) * 0.1;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      offsets[i] = Math.random() * Math.PI * 2; // Random phase for breathing
    }

    // Connect nearby points to form neural network connections (LineSegments)
    for (let i = 0; i < numPoints; i += 3) {
      const v1 = new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      for (let j = i + 1; j < numPoints; j += 7) {
        const v2 = new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        if (v1.distanceTo(v2) < 0.45) {
          lineCoords.push(v1.x, v1.y, v1.z);
          lineCoords.push(v2.x, v2.y, v2.z);
        }
      }
    }
    
    // Sparks for data flow inside
    for (let i = 0; i < numSparks; i++) {
      const idx = Math.floor(Math.random() * numPoints) * 3;
      sparks[i * 3] = pos[idx];
      sparks[i * 3 + 1] = pos[idx + 1];
      sparks[i * 3 + 2] = pos[idx + 2];
    }

    return { 
      basePositions: pos, 
      linesPositions: new Float32Array(lineCoords),
      sparkPositions: sparks,
      randomOffsets: offsets
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Motion interaction using mouse, touch, and scroll
    const scrollAngleY = scrollOffset.current * 0.9;
    const scrollAngleX = scrollOffset.current * 0.45;
    const targetX = (mouse.current.x * Math.PI) / 3 + scrollAngleY;
    const targetY = (mouse.current.y * Math.PI) / 3 + scrollAngleX;

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.06;

    // Smooth responsive placement: centered and scaled for mobile screens, offset for desktop
    const targetPosX = isMobileRef.current ? 0.35 : 2.5;
    const targetPosY = isMobileRef.current ? 0.15 : -0.2;
    const targetScale = isMobileRef.current ? 1.95 : 2.5;

    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
    const curScale = groupRef.current.scale.x;
    const newScale = curScale + (targetScale - curScale) * 0.05;
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Slow continuous rotation of the neural net
    pointsRef.current.rotation.y = time * 0.15;
    if (linesRef.current) linesRef.current.rotation.y = time * 0.15;
    if (sparksRef.current) sparksRef.current.rotation.y = time * 0.15;

    // Make every node move in its own direction independently (Breathing effect)
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < numPoints; i++) {
      const offset = randomOffsets[i];
      // Subtle oscillation on X, Y, Z for each point
      positions[i * 3] = basePositions[i * 3] + Math.sin(time * 2 + offset) * 0.02;
      positions[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(time * 1.5 + offset) * 0.02;
      positions[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(time * 2.5 + offset) * 0.02;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Animate sparks / dataflow jumping around
    if (sparksRef.current) {
      const sparksArr = sparksRef.current.geometry.attributes.position.array;
      for (let i = 0; i < numSparks; i++) {
        // Sparks randomly jump to a new node every so often
        if (Math.random() < 0.05) {
          const randomNodeIdx = Math.floor(Math.random() * numPoints) * 3;
          sparksArr[i * 3] = positions[randomNodeIdx];
          sparksArr[i * 3 + 1] = positions[randomNodeIdx + 1];
          sparksArr[i * 3 + 2] = positions[randomNodeIdx + 2];
        }
      }
      sparksRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={2.5} position={[2.5, -0.2, -3]}>
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={2}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Render Neural Nodes */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={basePositions.length / 3}
              array={basePositions.slice()} // copy base
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#3b82f6" // AI Blue
            size={0.03}
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Render Synapse Connections */}
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={linesPositions.length / 3}
              array={linesPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#8b5cf6" // Synapse Violet
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Render Dataflow Sparks */}
        <points ref={sparksRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={sparkPositions.length / 3}
              array={sparkPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#10b981" // Dataflow Green Sparks
            size={0.05}
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>
    </group>
  );
}
