import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const projects = [
    {
        id: 1,
        title: "Project-Centric Intelligence",
        subtitle: "P&ID Digitization Platform",
        bg: "from-cyan-900/20 to-blue-900/20",
        tech: ["Gemini 1.5", "Python", "OpenCV"],
        desc: "Digitizing complex Piping and Instrumentation Diagrams. Extracting assets and frequencies from vector PDFs.",
        visual: "laser"
    },
    {
        id: 2,
        title: "Financial Doc Processing",
        subtitle: "End-to-End OCR Pipeline",
        bg: "from-purple-900/20 to-pink-900/20",
        tech: ["PaddleOCR", "Data Engineering", "XML"],
        desc: "Extracting data from invoices and bank statements, generating structured XML for Tally Prime.",
        visual: "receipts"
    },
    {
        id: 3,
        title: "Multi-Tenant AI Chat",
        subtitle: "Contextual Navigation System",
        bg: "from-emerald-900/20 to-teal-900/20",
        tech: ["LangGraph", "React", "TypeScript"],
        desc: "Building scalable chatbot architectures with advanced intent classification and RAG.",
        visual: "nodes"
    }
];

// --- 3D Components ---

function LaserScan() {
    const group = useRef<THREE.Group>(null!);
    const laser = useRef<THREE.Mesh>(null!);

    // Generate grid points for P&ID representation
    const points = useMemo(() => {
        const temp = [];
        for (let x = -1.5; x <= 1.5; x += 0.1) {
            for (let y = -1.5; y <= 1.5; y += 0.1) {
                if (Math.random() > 0.8) continue; // Random gaps
                const z = Math.random() * 0.1;
                temp.push(x, y, z);
            }
        }
        return new Float32Array(temp);
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (laser.current) {
            laser.current.position.x = Math.sin(t) * 1.5;
        }
        if (group.current) {
            group.current.rotation.y = t * 0.1;
        }
    });

    return (
        <group ref={group}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length / 3}
                        args={[points, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial color="#00f0ff" size={0.02} transparent opacity={0.6} />
            </points>

            {/* Piping lines */}
            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[3.2, 3.2, 0.05]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.8} />
                <Edges color="#00f0ff" linewidth={1} threshold={15} />
            </mesh>

            {/* Scanning Laser */}
            <mesh ref={laser} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.1, 3.5, 0.5]} />
                <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

function FloatingReceipts() {
    const group = useRef<THREE.Group>(null!);

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
            group.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    const docs = useMemo(() => Array.from({ length: 8 }).map(() => ({
        pos: [
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
        ],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
    })), []);

    return (
        <group ref={group}>
            {docs.map((d, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2} position={d.pos as any}>
                    <group rotation={d.rot as any}>
                        <mesh>
                            <boxGeometry args={[0.6, 0.8, 0.02]} />
                            <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
                            <Edges color="#bf00ff" />
                        </mesh>
                        {/* Text lines */}
                        <mesh position={[0, 0.2, 0.02]}>
                            <planeGeometry args={[0.4, 0.05]} />
                            <meshBasicMaterial color="#bf00ff" />
                        </mesh>
                        <mesh position={[0, 0, 0.02]}>
                            <planeGeometry args={[0.4, 0.05]} />
                            <meshBasicMaterial color="#bf00ff" />
                        </mesh>
                        <mesh position={[0, -0.2, 0.02]}>
                            <planeGeometry args={[0.4, 0.05]} />
                            <meshBasicMaterial color="#bf00ff" />
                        </mesh>
                    </group>
                </Float>
            ))}
        </group>
    );
}

function NodeTree() {
    const group = useRef<THREE.Group>(null!);

    // Generate random nodes and connections
    const { nodes, lines } = useMemo(() => {
        const n = [];
        const l = [];
        for (let i = 0; i < 15; i++) {
            n.push(new THREE.Vector3(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            ));
        }
        for (let i = 0; i < n.length; i++) {
            for (let j = i + 1; j < n.length; j++) {
                if (n[i].distanceTo(n[j]) < 1.5) {
                    l.push(n[i], n[j]);
                }
            }
        }
        return { nodes: n, lines: l };
    }, []);

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={group}>
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <icosahedronGeometry args={[0.1, 1]} />
                    <meshBasicMaterial color="#00ff88" />
                </mesh>
            ))}
            {/* Lines */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={lines.length}
                        args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#00ff88" transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
}

function ProjectVisual({ type }: { type: string }) {
    if (type === 'laser') return <LaserScan />;
    if (type === 'receipts') return <FloatingReceipts />;
    if (type === 'nodes') return <NodeTree />;
    return null;
}

const Projects = () => {
    const [activeId, setActiveId] = useState(1);
    const activeProject = projects.find(p => p.id === activeId) || projects[0];

    return (
        <section className="min-h-screen w-full relative bg-dark-bg py-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center h-full gap-12">

                {/* Left: Text Content */}
                <div className="w-full md:w-1/2 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Project Architecture
                    </h2>

                    <div className="space-y-4">
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => setActiveId(p.id)}
                                className={`cursor-pointer p-6 rounded-xl border transition-all duration-300 ${activeId === p.id ? 'bg-white/5 border-primary/50 shadow-lg shadow-primary/10' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            >
                                <h3 className={`text-xl font-bold ${activeId === p.id ? 'text-white' : 'text-gray-500'}`}>{p.title}</h3>
                                {activeId === p.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-2 text-gray-300 text-sm"
                                    >
                                        <p className="mb-2 font-mono text-primary text-xs">{p.subtitle}</p>
                                        <p className="mb-4">{p.desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {p.tech.map(t => (
                                                <span key={t} className="px-2 py-1 rounded bg-white/10 text-xs border border-white/10">{t}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: 3D Visualization */}
                <div className="w-full md:w-1/2 h-[500px] relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-3xl -z-10" />
                    <div className="w-full h-full glass-panel rounded-3xl overflow-hidden border border-white/10">
                        <Canvas camera={{ position: [0, 0, 4] }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bf00ff" />
                            <Sparkles count={50} scale={3} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <ProjectVisual type={activeProject.visual} />
                            </Float>
                        </Canvas>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
