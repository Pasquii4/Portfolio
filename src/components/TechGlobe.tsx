"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Html, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const BG_PARTICLES = 300;

function seededRandom(seed: number) {
    return function () {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const TECH_POINTS = [
    { name: "Python", level: "85%" },
    { name: "FastAPI", level: "72%" },
    { name: "TypeScript", level: "70%" },
    { name: "Next.js", level: "60%" },
    { name: "React", level: "60%" },
    { name: "Docker", level: "75%" },
    { name: "PostgreSQL", level: "80%" },
    { name: "SQL", level: "80%" },
    { name: "Java", level: "65%" },
    { name: "Git", level: "85%" },
    { name: "Tailwind", level: "75%" },
    { name: "Astro", level: "60%" },
    { name: "Cloudflare", level: "65%" },
    { name: "Vercel", level: "65%" },
];

const goldenRatio = (1 + Math.sqrt(5)) / 2;
const techPositions = TECH_POINTS.map((_, i) => {
    const theta = Math.acos(1 - 2 * (i + 0.5) / TECH_POINTS.length);
    const phi = 2 * Math.PI * i / goldenRatio;
    return new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi) * 2,
        Math.cos(theta) * 2,
        Math.sin(theta) * Math.sin(phi) * 2
    );
});

const lines: [THREE.Vector3, THREE.Vector3][] = [];
for (let i = 0; i < techPositions.length; i++) {
    for (let j = i + 1; j < techPositions.length; j++) {
        if (techPositions[i].distanceTo(techPositions[j]) < 1.6) {
            lines.push([techPositions[i], techPositions[j]]);
        }
    }
}

function BgParticles() {
    const bgPositions = useMemo(() => {
        const pos = new Float32Array(BG_PARTICLES * 3);
        const rng = seededRandom(42);
        for (let i = 0; i < BG_PARTICLES; i++) {
            const theta = Math.acos(2 * rng() - 1);
            const phi = 2 * Math.PI * rng();
            const r = 2.0 + (rng() - 0.5) * 0.15;
            pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = r * Math.cos(theta);
            pos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
        }
        return pos;
    }, []);

    return (
        <Points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[bgPositions, 3]}
                    count={BG_PARTICLES}
                    array={bgPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00ff88"
                size={0.018}
                transparent
                opacity={0.35}
                sizeAttenuation={true}
            />
        </Points>
    );
}

function TechNode({ pos, index, name, level, setHoveredIndex, hoveredIndex }: any) {
    const isHovered = hoveredIndex === index;

    const Halo = () => {
        const haloRef = useRef<THREE.Mesh>(null);
        useFrame(({ clock }) => {
            if (haloRef.current) {
                const pulseScale = 1.0 + 0.5 * Math.abs(Math.sin(clock.elapsedTime * 1.5 + index * 0.7));
                haloRef.current.scale.setScalar(pulseScale);
            }
        });

        return (
            <Sphere ref={haloRef} args={[0.12, 12, 12]} position={pos}>
                <meshBasicMaterial color="#00ff88" transparent opacity={0.08} />
            </Sphere>
        );
    };

    return (
        <group>
            <Halo />

            <Sphere args={[0.065, 12, 12]} position={pos}>
                <meshBasicMaterial color="#00ff88" transparent opacity={0.4} />
            </Sphere>

            <Sphere
                args={[0.032, 8, 8]}
                position={pos}
                onPointerOver={(e) => { e.stopPropagation(); setHoveredIndex(index); }}
                onPointerOut={(e) => { e.stopPropagation(); setHoveredIndex(null); }}
            >
                <meshBasicMaterial color="#ffffff" />
            </Sphere>

            {isHovered && (
                <Html position={pos} center distanceFactor={8} zIndexRange={[100, 0]}>
                    <div style={{
                        background: "rgba(0,0,0,0.9)",
                        border: "1px solid #00ff88",
                        borderLeft: "3px solid #00ff88",
                        color: "#00ff88",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        padding: "5px 10px",
                        borderRadius: "0 3px 3px 0",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        letterSpacing: "0.05em"
                    }}>
                        {name} <span style={{ color: "#ffffff", opacity: 0.6 }}>·</span> {level}
                    </div>
                </Html>
            )}
        </group>
    );
}

function Scene() {
    const orbRef = useRef<THREE.Group>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);

    useFrame(() => {
        if (orbRef.current) {
            orbRef.current.rotation.y += isHovered ? 0.0005 : 0.0018;
        }
    });

    return (
        <group
            ref={orbRef}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <pointLight position={[0, 0, 0]} intensity={0.6} color="#00ff88" distance={3} />
            <ambientLight intensity={0.15} />

            <BgParticles />

            {lines.map((p, i) => (
                <Line key={i} points={p} color="#00ff88" lineWidth={0.3} transparent opacity={0.08} />
            ))}

            {techPositions.map((pos, i) => (
                <TechNode
                    key={i}
                    pos={pos}
                    index={i}
                    name={TECH_POINTS[i].name}
                    level={TECH_POINTS[i].level}
                    hoveredIndex={hoveredNodeIndex}
                    setHoveredIndex={setHoveredNodeIndex}
                />
            ))}
        </group>
    );
}

export default function TechGlobe() {
    return (
        <div className="w-full h-[480px] md:h-[520px]">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene />
                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.35} autoRotate={false} />
            </Canvas>
        </div>
    );
}
