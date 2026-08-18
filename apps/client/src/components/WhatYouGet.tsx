import React from 'react';

const features = [
  [
    'Cognitive Assessment',
    'Scientifically-backed questions that map your strengths, thinking style, and personality traits.',
    '✓',
  ],
  [
    'Smart Career Matching',
    'Personalized recommendations based on your interests, strengths, and goals.',
    '◎',
  ],
  [
    'Personalized Roadmaps',
    'Clear next steps with skills, milestones, and resources for your chosen direction.',
    '↗',
  ],
  [
    'Market Insights',
    'Salary data, growth projections, and demand trends for the careers you explore.',
    '⌁',
  ],
  [
    'Career Library',
    'Browse and compare careers across technology, business, healthcare, and creative fields.',
    '▣',
  ],
  [
    'Progress Tracking',
    'Keep track of your development, milestones, and movement toward your career goals.',
    '◫',
  ],
];

const WhatYouGet: React.FC = () => {
  return (
    <section
      id="features"
      className="
        relative
        py-24
        lg:py-32
        bg-white
        overflow-hidden
      "
    >

      <div
        className="
          absolute
          left-0
          top-1/3
          w-80
          h-80
          rounded-full
          bg-[#1EC957]/4
          blur-3xl
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        <div className="max-w-3xl">

          <div className="section-label text-[#148C48]">
            Features
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
            Everything you need to make a confident career decision
          </h2>

          <p
            className="
              mt-4
              text-base
              sm:text-lg
              text-[#52676A]
              leading-7
            "
          >
            Not just recommendations — a complete system for
            discovering, comparing, and planning your next move.
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
            lg:gap-6
          "
        >

          {features.map(([title, description, icon], index) => (
            <div
              key={title}
              className={`
                glass-light
                glass-hover
                rounded-2xl
                p-7
                ${
                  index === 0
                    ? 'border-[#1EC957]/25'
                    : ''
                }
              `}
            >

              <div className="icon-box mb-5 text-lg font-semibold">
                {icon}
              </div>

              <h3
                className="
                  text-lg
                  font-semibold
                  text-[#0B2023]
                "
              >
                {title}
              </h3>

              <p
                className="
                  mt-2.5
                  text-sm
                  text-[#52676A]
                  leading-6
                "
              >
                {description}
              </p>

              <div
                className="
                  mt-6
                  h-px
                  w-10
                  bg-[#1EC957]/35
                "
              />

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhatYouGet;