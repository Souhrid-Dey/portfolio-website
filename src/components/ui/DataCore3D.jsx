'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Layer node definitions [x, y, z]
const INPUT_NODES = [
  [-1.8, 1.1, 0.2],
  [-1.8, 0.0, -0.3],
  [-1.8, -1.1, 0.1],
];

const HIDDEN_1_NODES = [
  [-0.6, 1.3, -0.3],
  [-0.6, 0.5, 0.4],
  [-0.6, -0.4, -0.4],
  [-0.6, -1.3, 0.3],
];

const HIDDEN_2_NODES = [
  [0.6, 1.3, 0.3],
  [0.6, 0.5, -0.4],
  [0.6, -0.4, 0.4],
  [0.6, -1.3, -0.3],
];

const OUTPUT_NODES = [
  [1.8, 0.7, -0.1],
  [1.8, -0.7, 0.2],
];

// Synaptic connections: [fromNode, toNode, layerType]
const CONNECTIONS = [];

// Input -> Hidden 1
INPUT_NODES.forEach((inp) => {
  HIDDEN_1_NODES.forEach((h1) => {
    CONNECTIONS.push({ from: inp, to: h1, type: 'in-h1' });
  });
});

// Hidden 1 -> Hidden 2
HIDDEN_1_NODES.forEach((h1) => {
  HIDDEN_2_NODES.forEach((h2) => {
    CONNECTIONS.push({ from: h1, to: h2, type: 'h1-h2' });
  });
});

// Hidden 2 -> Output
HIDDEN_2_NODES.forEach((h2) => {
  OUTPUT_NODES.forEach((out) => {
    CONNECTIONS.push({ from: h2, to: out, type: 'h2-out' });
  });
});

const ALL_NODES = [
  ...INPUT_NODES.map((pos) => ({ pos, color: '#38bdf8', emissive: '#0284c7', label: 'Input' })),
  ...HIDDEN_1_NODES.map((pos) => ({ pos, color: '#a855f7', emissive: '#7e22ce', label: 'Hidden 1' })),
  ...HIDDEN_2_NODES.map((pos) => ({ pos, color: '#c084fc', emissive: '#9333ea', label: 'Hidden 2' })),
  ...OUTPUT_NODES.map((pos) => ({ pos, color: '#f472b6', emissive: '#db2777', label: 'Output' })),
];

// Electric Pulses traveling along synapses
function ElectricPulses() {
  const meshRef = useRef(null);
  const count = CONNECTIONS.length;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate unique phase offsets and speeds for each pulse
  const pulseMeta = useMemo(() => {
    return CONNECTIONS.map((_, i) => ({
      speed: 0.6 + (i % 5) * 0.12,
      offset: (i * 0.17) % 1.0,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    CONNECTIONS.forEach((conn, i) => {
      const meta = pulseMeta[i];
      // Progress from 0 to 1 along the synapse
      const progress = (time * meta.speed + meta.offset) % 1.0;

      // Linear interpolation along connection vector
      const x = conn.from[0] + (conn.to[0] - conn.from[0]) * progress;
      const y = conn.from[1] + (conn.to[1] - conn.from[1]) * progress;
      const z = conn.from[2] + (conn.to[2] - conn.from[2]) * progress;

      dummy.position.set(x, y, z);

      // Arc pulse intensity: swell in the middle of travel, shrink near knobs
      const pulseScale = Math.sin(progress * Math.PI) * 1.5;
      dummy.scale.setScalar(Math.max(0.01, pulseScale));
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color="#67e8f9" />
    </instancedMesh>
  );
}

// Synaptic Wire Grid
function SynapticLines() {
  const linePositions = useMemo(() => {
    const points = [];
    CONNECTIONS.forEach(({ from, to }) => {
      points.push(...from, ...to);
    });
    return new Float32Array(points);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8b5cf6" transparent opacity={0.28} />
    </lineSegments>
  );
}

// Neural Node Knobs
function NeuralKnobs() {
  const knobsRef = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    knobsRef.current.forEach((mesh, idx) => {
      if (mesh) {
        // Subtle pulsing of the knobs as electric waves fire
        const scale = 1 + Math.sin(time * 3 + idx * 0.7) * 0.08;
        mesh.scale.setScalar(scale);
      }
    });
  });

  return (
    <group>
      {ALL_NODES.map((node, i) => (
        <group key={i} position={node.pos}>
          {/* Outer Knob Casing */}
          <mesh
            ref={(el) => (knobsRef.current[i] = el)}
          >
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.emissive}
              emissiveIntensity={0.6}
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>

          {/* Glowing Inner Energy Nucleus */}
          <mesh>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Subtle Equatorial Ring on each Knob */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.16, 0.19, 20]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Gyroscopic Accelerator Rings (Engine Core Stabilizer)
function EngineRings() {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Gyro Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 80]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>

      {/* Counter-Rotating Mid Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.018, 16, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

// Reverse Spinning Neural Engine Object
function NeuralEngineObject() {
  const engineRef = useRef(null);

  useFrame((state, delta) => {
    if (engineRef.current) {
      // REVERSE SPINNING on Y-axis (Notice negative delta)
      engineRef.current.rotation.y -= delta * 0.35;

      // Gentle orbital pitch and yaw
      const t = state.clock.getElapsedTime();
      engineRef.current.rotation.x = Math.sin(t * 0.4) * 0.12;
      engineRef.current.rotation.z = Math.cos(t * 0.3) * 0.08;
    }
  });

  return (
    <group ref={engineRef} scale={1.2}>
      <SynapticLines />
      <ElectricPulses />
      <NeuralKnobs />
      <EngineRings />
    </group>
  );
}

export default function DataCore3D() {
  return (
    <div style={{ height: '360px', width: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 45 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, -5, -6]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, -8, 5]} intensity={0.5} color="#38bdf8" />

        <NeuralEngineObject />
      </Canvas>
    </div>
  );
}
