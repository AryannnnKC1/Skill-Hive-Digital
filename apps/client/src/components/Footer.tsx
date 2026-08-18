import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      className="
        bg-gradient-to-b from-brand-dark to-brand-dark-deep
        text-text-secondary
        border-t
        border-green-alpha-18
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          py-14
          lg:py-16
        "
      >

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >

          <div>

            <img
              src="/logogs.png"
              alt="SkillHive Digital"
              className="h-22 w-auto object-contain -ml-4"
            />

            <p
              className="
                mt-4
                text-sm
                leading-6
                max-w-xs
                text-text-tertiary
              "
            >
              Career guidance backed by data,
              designed to turn uncertainty into
              a practical next step.
            </p>

          </div>


          <div>

            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Platform
            </h3>

            <Link
              to="/assessment"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Career Assessment
            </Link>

            <Link
              to="/careers"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Career Search
            </Link>

            <Link
              to="/dashboard"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Dashboard
            </Link>

          </div>


          <div>

            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Company
            </h3>

            <a
              href="#about"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              About Us
            </a>

            <a
              href="mailto:info@skillhivedigital.com"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Contact
            </a>

            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="block text-sm mb-2.5 hover:text-brand-green transition-colors"
            >
              Terms of Service
            </a>

          </div>


          <div>

            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Connect
            </h3>

            <div className="flex gap-2.5">

              {['in', 'x', 'ig'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="
                    w-9
                    h-9
                    rounded-xl
                    border
                    border-green-alpha-18
                    bg-green-alpha-05
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-semibold
                    hover:bg-green-alpha-12
                    hover:text-brand-green
                    hover:border-green-alpha-18
                    transition-colors
                  "
                >
                  {label}
                </a>
              ))}

            </div>

          </div>

        </div>


        <div
          className="
            mt-12
            pt-7
            border-t
            border-green-alpha-08
            flex
            flex-col
            sm:flex-row
            gap-3
            justify-between
            text-xs
            text-text-tertiary
          "
        >

          <div>
            © 2026 SkillHive Digital. All rights reserved.
          </div>

          <div className="flex gap-5">

            <a
              href="#"
              className="hover:text-text-secondary transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-text-secondary transition-colors"
            >
              Terms
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;