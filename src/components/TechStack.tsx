import { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const technologies = [
    "Python", "React", "TypeScript", "LangGraph",
    "Gemini API", "Document AI", "OpenCV", "SciPy",
    "PaddleOCR", "Three.js", "WebGL", "Tailwind",
    "Node.js", "PostgreSQL", "Docker", "AWS"
];

function Word({ children, position }: { children: string; position: THREE.Vector3 }) {
    return (
        <Float floatIntensity={2} rotationIntensity={0}>
            <Html position={position} distanceFactor={10} center>
                <div className="select-none text-cyan-400 font-mono text-sm whitespace-nowrap glow-text" style={{ textShadow: '0 0 5px #00f0ff' }}>
                    {children}
                </div>
            </Html>
        </Float>
    );
}

function Cloud({ radius = 20 }) {
    // Create a cloud of words
    const words = useMemo(() => {
        const temp = [];

        // We'll just distribute the `technologies` array on a sphere
        for (let i = 0; i < technologies.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / technologies.length);
            const theta = Math.sqrt(technologies.length * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            temp.push({ pos: new THREE.Vector3(x, y, z), word: technologies[i] });
        }
        return temp;
    }, [radius]);

    return (
        <group>
            {words.map((w, i) => (
                <Word key={i} position={w.pos}>{w.word}</Word>
            ))}
        </group>
    );
}

const OrbitRings = () => {
    return (
        <group rotation={[Math.PI / 8, Math.PI / 8, 0]}>
            {/* Inner Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
            </mesh>
            {/* Outer Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#bf00ff" transparent opacity={0.3} />
            </mesh>
            {/* Tilted Ring */}
            <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
                <torusGeometry args={[4, 0.01, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const Planet = () => {
    return (
        <group>
            {/* Core Sphere */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#00f0ff"
                    emissiveIntensity={0.2}
                    wireframe
                />
            </mesh>
            {/* Inner Glow Sphere */}
            <mesh>
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            {/* AI Text Label */}
            <Html center>
                <div className="text-3xl md:text-5xl font-bold text-white tracking-widest pointer-events-none select-none drop-shadow-[0_0_15px_rgba(0,240,255,1)]">
                    AI
                </div>
            </Html>
        </group>
    );
};

const ResponsiveScene = () => {
    const { viewport } = useThree();
    // Simple logic: if viewport width is small (indicating mobile), scale down
    const isMobile = viewport.width < 10;
    const scale = isMobile ? 0.6 : 1;

    return (
        <group scale={scale} rotation={[0, 0, 0]}>
            <Planet />
            <OrbitRings />
            <Cloud radius={4} />
        </group>
    );
};

const TechStack = () => {
    return (
        <section className="min-h-screen w-full bg-dark-bg relative py-20 overflow-hidden" style={{ backgroundColor: '#050505' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-0 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary cyber-glitch-2" data-text="Tech Stack Orbit">
                Tech Stack Orbit
            </h2>
            <p className="text-center text-gray-400 mb-8 relative z-10 font-mono text-sm mt-4">Drag to rotate</p>

            <div className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-events-none md:pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                    <ResponsiveScene />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
                </Canvas>
            </div>
        </section>
    );
};

export default TechStack;
