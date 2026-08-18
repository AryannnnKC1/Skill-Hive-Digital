import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatYouGet from '../components/WhatYouGet';
import CareerPaths from '../components/CareerPaths';
import SocialProof from '../components/SocialProof';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  useEffect(() => {
    document.title = 'SkillHive Digital — Career Guidance for Students';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dashboard text-text-primary overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <WhatYouGet />
        <CareerPaths />
        <SocialProof />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;