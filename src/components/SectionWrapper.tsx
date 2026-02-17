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

    // Scale: makes the section shrink as it recedes
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 0.8]
    );

    // RotateX: tilts the section backward in 3D space
    const rotateX = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 15] // degrees
    );

    // TranslateY: moves the section down as it rotates
    const translateY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -100] // pixels
    );

    // Opacity: fades out as it goes back
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [1, 0.8, 0.4]
    );

    // Brightness: darkens for depth
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

    // Hide sections that are fully scrolled past to prevent darkening effect
    const visibility = useTransform(
        scrollYProgress,
        [0, 0.99, 1],
        ['visible', 'visible', 'hidden']
    );

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen sticky top-0 ${className}`}
            style={{
                zIndex,
                backgroundColor: '#050505',
                perspective: '2000px', // 3D perspective container
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
                    transformOrigin: 'center top',
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SectionWrapper;
