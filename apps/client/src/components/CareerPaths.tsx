import React from 'react';
import { Link } from 'react-router-dom';

const paths = [
  [
    'Software Engineering',
    'Build applications, systems, and infrastructure that power the modern world.',
    '</>',
  ],
  [
    'Data Science',
    'Turn raw data into insights that drive decisions across every industry.',
    '01',
  ],
  [
    'UI/UX Design',
    'Shape how people interact with digital products through research and design.',
    '✦',
  ],
  [
    'Finance & Accounting',
    'Manage capital, analyze markets, and drive financial strategy.',
    '$',
  ],
  [
    'Business & Management',
    'Lead teams, develop strategy, and scale organizations.',
    '↗',
  ],
  [
    'Healthcare',
    'Improve lives through medicine, health technology, and clinical research.',
    '+',
  ],
];

const CareerPaths: React.FC = () => {
  return (
    <section
      id="careers"
      className="
        relative
        py-24
        lg:py-32
        bg-[#F7FAF8]
        overflow-hidden
      "
    >

      <div
        className="
          absolute
          right-0
          top-0
          w-96
          h-96
          bg-[#148C48]/5
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto">

          <div className="section-label justify-center text-[#148C48]">
            Explore Paths
          </div>

          <h2
            className="
              mt-4
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-normal
              tracking-[0.01em]
              text-[#0B2023]
              display-heading
            "
          >
            Careers you can grow into
          </h2>

          <p
            className="
              mt-4
              text-base
              sm:text-lg
              text-[#52676A]
            "
          >
            Explore career directions across technology,
            business, healthcare, and creative industries.
          </p>

        </div>


        <div
          className="
            mt-12
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >

          {paths.map(([title, description, icon]) => (
            <Link
              key={title}
              to="/careers"
              className="
                group
                glass-light
                glass-hover
                rounded-2xl
                p-6
                block
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div className="icon-box text-sm font-semibold">
                  {icon}
                </div>

                <span
                  className="
                    text-[#148C48]/0
                    group-hover:text-[#148C48]
                    transition-colors
                    text-xl
                  "
                >
                  ↗
                </span>

              </div>


              <h3
                className="
                  mt-5
                  text-lg
                  font-semibold
                  text-[#0B2023]
                  group-hover:text-[#148C48]
                  transition-colors
                "
              >
                {title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#52676A]
                  leading-6
                "
              >
                {description}
              </p>

            </Link>
          ))}

        </div>


        <div className="mt-10 text-center">

          <Link
            to="/careers"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#148C48]
              hover:text-[#0B2023]
              transition-colors
            "
          >
            Browse all career paths
            <span>→</span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default CareerPaths;