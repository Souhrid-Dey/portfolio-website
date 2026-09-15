import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import CoreEcosystem from '../components/sections/CoreEcosystem';
import Projects from '../components/sections/Projects';
import DeyrDynamicsLab from '../components/sections/DeyrDynamicsLab';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CoreEcosystem />
      <Projects />
      <DeyrDynamicsLab />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
