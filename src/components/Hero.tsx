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

const Typewriter = ({ text, delay = 0, className, style, dataText }: { text: string, delay?: number, className?: string, style?: any, dataText?: string }) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        }
    };

    return (
        <motion.div
            style={{ display: "flex", overflow: "hidden", ...style }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            data-text={dataText} // Pass data-text for glitch effect
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

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
                <div className="text-center flex flex-col items-center">
                    <Typewriter
                        text="Bishal Rijal"
                        delay={0.5}
                        className="text-xl md:text-2xl font-mono text-primary mb-4 tracking-widest uppercase cyber-glitch-1"
                        style={{ textShadow: '2px 2px #ff003c', justifyContent: 'center' }}
                        dataText="Bishal Rijal"
                    />

                    <Typewriter
                        text="AI ARCHITECT"
                        delay={1.5}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] cyber-glitch-2"
                        dataText="AI ARCHITECT"
                        style={{ justifyContent: 'center' }}
                    />

                    <motion.p
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        transition={{ delay: 3, duration: 2, ease: "easeOut" }}
                        className="mt-4 text-xl md:text-2xl text-gray-400 max-w-lg mx-auto font-mono border-r-2 border-primary pr-2 overflow-hidden whitespace-nowrap"
                    >
                        Building robust multi-tenant...
                    </motion.p>
                    {/* Full text replacement for better responsiveness logic if needed, simplied above to width anim */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="mt-4 text-xl md:text-2xl text-gray-400 max-w-lg mx-auto font-mono flex justify-center"
                    >
                        <Typewriter text="Building robust multi-tenant architectures & data pipelines." delay={3} style={{ flexWrap: 'wrap', justifyContent: 'center' }} />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5.5, duration: 0.5 }}
                    className="mt-12 pointer-events-auto"
                >
                    <button className="group relative px-8 py-4 bg-transparent transition-all hover:scale-105 active:scale-95">
                        <div className="absolute inset-0 border-2 border-primary bg-primary/10 skew-x-12 group-hover:bg-primary/20 transition-all"></div>
                        <div className="absolute inset-0 border-2 border-secondary bg-transparent -skew-x-12 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></div>
                        <span className="relative text-primary font-bold font-mono tracking-widest uppercase text-lg group-hover:text-white transition-colors">Initialize_System</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
