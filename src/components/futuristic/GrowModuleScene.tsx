"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The 3D "GROW MODULE": a glowing specimen terrarium.
 * - instanced particles arranged on a phyllotaxis foliage volume (the specimen)
 * - an emissive wireframe glass sphere enclosure
 * - neon rim point-lights + slow auto-rotate + pointer parallax
 * No postprocessing dependency: bloom is faked with additive emissive points
 * and an outer glow sprite + CSS blur on the canvas wrapper.
 */

const NEON = new THREE.Color("#5cf2a0");
const CYAN = new THREE.Color("#5be0e6");

function Foliage({ count = 520 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    const arr: { base: THREE.Vector3; scale: number; tint: THREE.Color; phase: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      // phyllotaxis sphere-ish foliage cloud, denser at top
      const t = i / count;
      const y = 1 - t * 1.85; // 1 .. -0.85
      const r = Math.sqrt(Math.max(0, 1 - y * y)) * (0.55 + 0.5 * (1 - t));
      const theta = i * golden;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const tint = NEON.clone().lerp(CYAN, Math.random() * 0.5 + t * 0.3);
      arr.push({
        base: new THREE.Vector3(x, y * 0.95, z),
        scale: 0.03 + Math.random() * 0.05,
        tint,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!ref.current) return;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const breathe = 1 + Math.sin(time * 1.2 + d.phase) * 0.12;
      const drift = Math.sin(time * 0.6 + d.phase) * 0.02;
      dummy.position.set(d.base.x, d.base.y + drift, d.base.z);
      dummy.scale.setScalar(d.scale * breathe);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
      ref.current.setColorAt(i, d.tint);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        emissive={NEON}
        emissiveIntensity={2.4}
        color="#0c2a2a"
        roughness={0.3}
        metalness={0.1}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function Enclosure() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current)
      ref.current.rotation.y = -state.clock.elapsedTime * 0.06;
  });
  return (
    <group>
      {/* wireframe glass shell */}
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>
      {/* faint solid shell for depth */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#0c2a2a"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      {/* base ring / grow-light plate */}
      <mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.2, 48]} />
        <meshBasicMaterial
          color={NEON}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={CYAN}
        transparent
        opacity={0.7}
        sizeAttenuation
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null!);
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current) return;
    // slow auto-rotate + pointer parallax
    group.current.rotation.y += delta * 0.18;
    const targetX = pointer.y * 0.25;
    const targetY = group.current.rotation.y; // keep spin
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.05,
    );
    // parallax tilt via position
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      pointer.x * 0.18,
      0.05,
    );
    void targetY;
  });
  return (
    <group ref={group}>
      <Foliage />
      <Enclosure />
      <Particles />
    </group>
  );
}

export default function GrowModuleScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 4.6], fov: 42 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      frameloop="always"
    >
      <color attach="background" args={["#06120d"]} />
      <fog attach="fog" args={["#06120d", 4, 9]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 2, 3]} intensity={18} color="#5cf2a0" distance={12} />
      <pointLight position={[-3, -1, -2]} intensity={14} color="#5be0e6" distance={12} />
      <pointLight position={[0, 3, -3]} intensity={8} color="#e15bc9" distance={10} />
      <Rig />
    </Canvas>
  );
}
