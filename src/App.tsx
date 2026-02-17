import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import SectionWrapper from '@/components/SectionWrapper';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-primary/30 relative">
      <div className="scanlines" />

      <SectionWrapper zIndex={10}>
        <Suspense fallback={<div className="p-10 text-center">Loading Hero...</div>}>
          <Hero />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper zIndex={20}>
        <Suspense fallback={<div className="p-10 text-center">Loading Experience...</div>}>
          <Experience />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper zIndex={30}>
        <Suspense fallback={<div className="p-10 text-center">Loading Projects...</div>}>
          <Projects />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper zIndex={40}>
        <Suspense fallback={<div className="p-10 text-center">Loading TechStack...</div>}>
          <TechStack />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper zIndex={50}>
        <Suspense fallback={<div className="p-10 text-center">Loading Contact...</div>}>
          <Contact />
        </Suspense>
      </SectionWrapper>
    </div>
  );
}

export default App;
