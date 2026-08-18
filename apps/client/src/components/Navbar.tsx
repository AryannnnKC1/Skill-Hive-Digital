import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    setMobileMenuOpen(false);

    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    ['Home', 'home'],
    ['Features', 'features'],
    ['Careers', 'careers'],
    ['How It Works', 'how-it-works'],
    ['About Us', 'about'],
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">

        <div
          className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'glass-dark shadow-dark border-white/15'
              : 'glass-dark border-white/10'
          }`}
        >

          <div className="h-[72px] px-5 sm:px-7 flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center shrink-0"
              aria-label="SkillHive Digital home"
            >
              <img
                src="/logogsh.png"
                alt="SkillHive Digital"
                className="h-11 sm:h-30 w-auto object-contain"
              />
            </Link>


            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">

              {links.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`relative text-sm transition-colors duration-200 cursor-pointer ${
                    id === 'home'
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}

                  {id === 'home' && (
                    <span
                      className="
                        absolute
                        -bottom-3
                        left-1/2
                        -translate-x-1/2
                        h-1
                        w-1
                        rounded-full
                        bg-[#1EC957]
                        shadow-[0_0_10px_rgba(30,201,87,.8)]
                      "
                    />
                  )}
                </a>
              ))}

            </div>


            {/* RIGHT SIDE */}
            <div className="hidden lg:flex items-center gap-2.5">

              <ThemeSwitcher />

              <Link
                to="/login"
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-green-alpha-18
                  text-text-primary
                  text-sm
                  hover:border-brand-green
                  transition-colors
                  glass-button
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn-primary px-5 py-2.5 text-sm rounded-xl"
              >
                Get Started
              </Link>

            </div>


            {/* MOBILE */}
            <div className="lg:hidden flex items-center gap-2">

              <ThemeSwitcher />

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen((open) => !open)
                }
                className="
                  h-10
                  w-10
                  rounded-xl
                  border
                  border-white/10
                  text-white
                  flex
                  items-center
                  justify-center
                "
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="relative block w-5 h-4">

                  <span
                    className={`
                      absolute
                      left-0
                      top-0
                      w-5
                      h-px
                      bg-current
                      transition-transform
                      ${
                        mobileMenuOpen
                          ? 'translate-y-2 rotate-45'
                          : ''
                      }
                    `}
                  />

                  <span
                    className={`
                      absolute
                      left-0
                      top-2
                      w-5
                      h-px
                      bg-current
                      transition-opacity
                      ${
                        mobileMenuOpen
                          ? 'opacity-0'
                          : 'opacity-100'
                      }
                    `}
                  />

                  <span
                    className={`
                      absolute
                      left-0
                      top-4
                      w-5
                      h-px
                      bg-current
                      transition-transform
                      ${
                        mobileMenuOpen
                          ? '-translate-y-2 -rotate-45'
                          : ''
                      }
                    `}
                  />

                </span>
              </button>

            </div>

          </div>
        </div>
      </nav>


      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-[#061719]/95
            backdrop-blur-2xl
            lg:hidden
            pt-28
            px-6
          "
        >

          <div
            className="
              max-w-md
              mx-auto
              glass-dark
              rounded-3xl
              p-7
              border-white/10
            "
          >

            <div className="flex flex-col gap-5">

              {links.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) =>
                    handleNavClick(e, id)
                  }
                  className="
                    text-xl
                    text-white/85
                    hover:text-[#1EC957]
                    transition-colors
                  "
                >
                  {label}
                </a>
              ))}

              <div className="h-px bg-white/10 my-1" />

              <Link
                to="/login"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-lg text-white/70"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  btn-primary
                  px-6
                  py-3.5
                  text-center
                "
              >
                Get Started
              </Link>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;