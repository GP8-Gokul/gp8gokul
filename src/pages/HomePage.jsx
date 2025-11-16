import Intro from '../components/Intro';
import About from '../components/About';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useRef } from 'react';

export default function HomePage() {

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationsRef = useRef(null);
  const contactsRef = useRef(null);

  return (
    <div 
      className="
        min-h-screen 
        pt-20
        bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100
        text-gray-900 font-sans
        relative overflow-x-hidden cursor-default
      "
    >
      <Navbar aboutRef={aboutRef} projectsRef={projectsRef} certificationsRef={certificationsRef} contactsRef={contactsRef} />
      <Intro projectsRef={projectsRef} contactsRef={contactsRef} />
      <About aboutRef={aboutRef} />
      <Projects projectsRef={projectsRef} />
      <Certifications certificationsRef={certificationsRef} />
      <Contacts contactsRef={contactsRef} />
      <Footer />
    </div>
  );
}