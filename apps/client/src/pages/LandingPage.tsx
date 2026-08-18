import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatYouGet from '../components/WhatYouGet';
import CareerPaths from '../components/CareerPaths';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  useEffect(() => {
    document.title = 'SkillHive Digital';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen text-ink relative overflow-hidden bg-surface'>
      <div className='relative z-10 flex flex-col min-h-screen'>
        <Navbar />
        <main className='grow'>
          <Hero />
          <HowItWorks />
          <WhatYouGet />
          <CareerPaths />

          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
