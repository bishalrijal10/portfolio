import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function ParticleSystem(props: any) {
    const ref = useRef<THREE.Points>(null!);
    const [sphere] = useMemo(() => {
        const positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });
        // Verify positions are finite/valid
        for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) positions[i] = 0;
        }
        return [positions];
    }, []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-dark-bg">
            <div className="absolute inset-0 z-0 cursor-move">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleSystem />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
                </Canvas>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-sm md:text-xl font-mono text-cyan-300 mb-4 tracking-widest uppercase">
                        Bishal Rijal
                    </h2>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                        AI ARCHITECT
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-lg mx-auto font-mono">
                        Building robust multi-tenant architectures & data pipelines.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 pointer-events-auto"
                >
                    <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105">
                        <div className="absolute inset-0 border border-primary/50 rounded-full group-hover:border-primary transition-colors"></div>
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                        <span className="relative text-primary font-mono tracking-widest uppercase text-sm">Initialize Experience</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
