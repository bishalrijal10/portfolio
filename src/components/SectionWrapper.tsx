import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    zIndex: number;
    className?: string;
    isLast?: boolean; // New prop to disable effects for the last section
}

const SectionWrapper = ({ children, zIndex, className = '', isLast = false }: SectionWrapperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Customize offset to ensure trigger happens correctly as section leaves view
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Simple depth scale, no blurring/darkening to avoid readability issues
    // Effect triggers only in the last 20% of the scroll overlap
    const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.95]);

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen sticky top-0 ${className}`}
            style={{ zIndex, backgroundColor: '#050505' }}
        >
            <motion.div
                style={{
                    scale: isLast ? 1 : scale
                }}
                className="w-full h-full origin-top"
            >
                {children}
            </motion.div>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen sticky top-0 ${className}`}
            style={{ zIndex, backgroundColor: '#050505' }} // Force opaque background
        >
            <motion.div
                style={{ scale, filter }}
                className="w-full h-full origin-top"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SectionWrapper;
