import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import type { LucideIcon } from 'lucide-react';
import * as THREE from 'three';

interface FloatingBoxProps {
  color: string;
  children: React.ReactNode;
  rotationSpeed?: number;
}

const FloatingBox = ({ color, children, rotationSpeed = 0.3 }: FloatingBoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    }),
    [color]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <RoundedBox args={[1.6, 1.6, 0.5]} radius={0.15} smoothness={4}>
        <primitive object={material} attach="material" />
      </RoundedBox>
      <Html center transform distanceFactor={2.2} style={{ pointerEvents: 'none' }}>
        {children}
      </Html>
    </mesh>
  );
};

interface Icon3DProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  boxColor?: string;
  className?: string;
}

export const Icon3D = ({
  icon: Icon,
  size = 48,
  color = '#60a5fa',
  boxColor = '#1e293b',
  className = '',
}: Icon3DProps) => {
  const canvasSize = size + 20;
  const iconSize = size * 0.55;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: canvasSize, height: canvasSize }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        style={{ width: canvasSize, height: canvasSize }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={1.2} />
        <directionalLight position={[-2, -1, 3]} intensity={0.3} />
        <Suspense fallback={null}>
          <FloatingBox color={boxColor}>
            <Icon
              size={iconSize}
              color={color}
              strokeWidth={2.5}
              style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.5))' }}
            />
          </FloatingBox>
        </Suspense>
      </Canvas>
    </div>
  );
};

// Smaller 3D icon variant for cards - uses CSS 3D transforms for performance
interface Icon3DCardProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export const Icon3DCard = ({ icon: Icon, size = 28, className = '' }: Icon3DCardProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ perspective: '200px' }}
    >
      <div
        className="rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 flex items-center justify-center"
        style={{
          width: size + 24,
          height: size + 24,
          transform: 'rotateY(-8deg) rotateX(5deg)',
          boxShadow: '4px 4px 12px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Icon
          size={size}
          className="text-primary"
          style={{
            filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.3))',
            transform: 'translateZ(8px)',
          }}
        />
      </div>
    </div>
  );
};

// Inline 3D-styled icon for small uses (lists, metadata)
interface Icon3DInlineProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export const Icon3DInline = ({ icon: Icon, size = 16, className = '' }: Icon3DInlineProps) => {
  return (
    <Icon
      size={size}
      className={className}
      style={{
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))',
        transform: 'perspective(100px) rotateY(-5deg)',
      }}
    />
  );
};
