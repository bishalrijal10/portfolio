import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    zIndex: number;
    className?: string;
}

const SectionWrapper = ({ children, zIndex, className = '' }: SectionWrapperProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Scale down slightly to create depth, but NO opacity fade to prevent bleed-through
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen sticky top-0 ${className}`}
            style={{ zIndex, backgroundColor: '#050505' }} // Force opaque background
        >
            <motion.div
                style={{ scale }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default SectionWrapper;
