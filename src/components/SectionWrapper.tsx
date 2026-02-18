import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    zIndex: number;
    className?: string;
    isLast?: boolean;
}

const SectionWrapper = ({ children, zIndex, className = '', isLast = false }: SectionWrapperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // 3D STACKING TRANSFORMS - Card-like perspective effect

    // Scale: smoothly shrinks the card to create a stacking illusion
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 0.85]
    );

    // RotateX: minimal rotation to keep it looking like a flat card stack
    const rotateX = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 5] // slight tilt
    );

    // TranslateY: no vertical movement needed for stacking; the next section slides over
    const translateY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -50] // slight upward drift to enhance depth
    );

    // Opacity: keep it visible to maintain the stack effect
    const opacity = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1] // Keep full opacity
    );

    // Brightness: darkens significantly to push it to the background
    const brightness = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 0.5]
    );

    // Create filter transform
    const brightnessFilter = useTransform(
        brightness,
        (b) => `brightness(${b})`
    );

    // Hide sections that are fully scrolled past
    const visibility = useTransform(
        scrollYProgress,
        [0, 0.99, 1],
        ['visible', 'visible', 'hidden']
    );

    return (
        <div
            ref={containerRef}
            className={`sticky top-0 h-screen ${className}`} // Removed min-h-screen, enforced h-screen for sticky behavior
            style={{
                zIndex,
                perspective: '1000px', // Adjusted perspective
            }}
        >
            <motion.div
                style={{
                    scale: isLast ? 1 : scale,
                    rotateX: isLast ? 0 : rotateX,
                    translateY: isLast ? 0 : translateY,
                    opacity: isLast ? 1 : opacity,
                    filter: isLast ? 'none' : brightnessFilter,
                    visibility: isLast ? 'visible' : visibility,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'top center', // Changed anchor point
                }}
                className="w-full h-full relative"
            >
                <div className="w-full h-full rounded-[40px] overflow-hidden bg-dark-bg border border-white/10 shadow-2xl">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper;
