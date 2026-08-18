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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-[0_1px_0_var(--color-border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-display text-lg text-ink cursor-pointer">
              <img src="/logo.png" alt="Career Counselling Application Logo" className="h-8 w-auto object-contain" />
              SkillHive
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className="text-ink-subtle hover:text-accent transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-ink-subtle hover:text-accent transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Features
              </a>
              <a
                href="#careers"
                onClick={(e) => handleNavClick(e, 'careers')}
                className="text-ink-subtle hover:text-accent transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Careers
              </a>
            </div>

            {/* Desktop Right side CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="text-ink-subtle hover:text-ink transition-colors duration-200 font-medium cursor-pointer text-sm"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-accent-hover transition-all duration-200 font-semibold cursor-pointer text-sm shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile right: hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                className="p-2 text-ink-subtle hover:text-ink focus:outline-none cursor-pointer"
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
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-surface pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="text-2xl font-semibold text-ink hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="text-2xl font-semibold text-ink hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#careers"
              onClick={(e) => handleNavClick(e, 'careers')}
              className="text-2xl font-semibold text-ink hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              Careers
            </a>
            <div className="h-px bg-border my-4" />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-medium text-ink-subtle hover:text-ink transition-colors duration-200 cursor-pointer"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-accent text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-accent-hover transition-all duration-200 cursor-pointer"
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
