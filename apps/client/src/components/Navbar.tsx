import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-bold text-lg text-slate-900 cursor-pointer">
              SkillHive
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Features
              </a>
              <a
                href="#careers"
                onClick={(e) => handleNavClick(e, 'careers')}
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Careers
              </a>
            </div>

            {/* Desktop Right side CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="text-2xl font-semibold text-slate-900 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="text-2xl font-semibold text-slate-900 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#careers"
              onClick={(e) => handleNavClick(e, 'careers')}
              className="text-2xl font-semibold text-slate-900 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
            >
              Careers
            </a>
            <div className="h-px bg-slate-200 my-4" />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 cursor-pointer"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
