import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

const experiences = [
    {
        id: 1,
        company: "BCT",
        role: "AI Architect / Engineer",
        date: "Current",
        logo: "https://placehold.co/100x100/00f0ff/000000?text=BCT", // Placeholder
        details: [
            "Designing robust multi-tenant AI chatbot architectures, leveraging intent classification and intelligent navigation.",
            "Automating enterprise workflows (e.g., Zoho People login/check-in/checkout scripts) and bridging AI with internal systems."
        ]
    },
    // Add more if needed, prompt specified BCT with 2 focuses.
];

const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const xPct = x / width - 0.5;
        const yPct = y / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const rotateX = useSpring(useMotionTemplate`${mouseY.get() * -20}deg`, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useMotionTemplate`${mouseX.get() * 20}deg`, { stiffness: 150, damping: 20 });

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY
            }}
            className={`glass-panel p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] ${className}`}
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <section className="min-h-screen w-full bg-dark-bg py-20 px-4 md:px-10 relative z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Professional Timeline
            </h2>

            <div className="max-w-4xl mx-auto flex flex-col gap-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

                {experiences.map((exp, index) => (
                    <div key={exp.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 shadow-[0_0_10px_#00f0ff]" />

                        {/* Content w/ Tilt */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0">
                            <TiltCard className="border-l-4 border-l-primary/50">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={exp.logo} alt={exp.company} className="w-12 h-12 rounded-full border border-white/10" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                                        <p className="text-sm text-primary font-mono">{exp.role}</p>
                                        <p className="text-xs text-gray-400">{exp.date}</p>
                                    </div>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                                    {exp.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </TiltCard>
                        </div>

                        {/* Empty space for the other side */}
                        <div className="hidden md:block w-1/2" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
