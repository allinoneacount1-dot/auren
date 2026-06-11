"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   3D GOLD CRYSTAL / MINERAL
   ═══════════════════════════════════════════ */

function GoldCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#C8A24B"
          emissive="#C8A24B"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.15}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function GlowOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function DataParticles() {
  const points = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4FD1C5"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshStandardMaterial
        color="#C8A24B"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════
   HERO 3D SCENE
   ═══════════════════════════════════════════ */

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E8E2D6" />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4FD1C5" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#C8A24B" />

        <GoldCrystal />
        <GlowOrb position={[-2.5, 1, -1]} color="#C8A24B" scale={1.2} />
        <GlowOrb position={[2.5, -0.5, -1.5]} color="#4FD1C5" scale={0.8} />
        <GlowOrb position={[1, 2, -2]} color="#C8A24B" scale={0.6} />
        <DataParticles />
        <GridFloor />

        <Environment preset="city" />
      </Canvas>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
    </div>
  );
}
