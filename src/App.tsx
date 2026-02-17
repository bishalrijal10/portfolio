import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-primary/30 relative">
      <div className="scanlines" />
      <Suspense fallback={<div className="p-10 text-center">Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div className="p-10 text-center">Loading Experience...</div>}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="p-10 text-center">Loading Projects...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="p-10 text-center">Loading TechStack...</div>}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<div className="p-10 text-center">Loading Contact...</div>}>
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;
