import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Account',
    text: 'Sign up and tell us a little about yourself.',
  },
  {
    number: '02',
    title: 'Take Assessment',
    text: 'Unlock your potential with our guided assessment.',
  },
  {
    number: '03',
    title: 'Get Matched',
    text: 'Our AI matches you with career paths that fit.',
  },
  {
    number: '04',
    title: 'Start Learning',
    text: 'Follow your personalized roadmap and grow.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
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
          -right-24
          top-20
          w-72
          h-72
          rounded-full
          bg-[#1EC957]/5
          blur-3xl
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        <div className="text-center">

          <div className="section-label justify-center text-[#148C48]">
            How It Works
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
            Your Journey in 4 Simple Steps
          </h2>

          <p
            className="
              mt-4
              text-base
              sm:text-lg
              text-[#52676A]
              max-w-2xl
              mx-auto
            "
          >
            A clear path from self-discovery to a career
            direction you can act on.
          </p>

        </div>


        <div className="relative mt-14 lg:mt-16">

          {/* CONNECTING LINE */}

          <div
            className="
              hidden
              lg:block
              absolute
              top-1/2
              left-[12%]
              right-[12%]
              h-px
              bg-[#1EC957]/25
            "
          />


          <div
            className="
              hidden
              lg:block
              absolute
              top-1/2
              left-[25%]
              w-2
              h-2
              -translate-y-1/2
              rounded-full
              bg-[#1EC957]
              shadow-[0_0_12px_rgba(30,201,87,.7)]
            "
          />

          <div
            className="
              hidden
              lg:block
              absolute
              top-1/2
              left-[50%]
              w-2
              h-2
              -translate-y-1/2
              rounded-full
              bg-[#1EC957]
              shadow-[0_0_12px_rgba(30,201,87,.7)]
            "
          />

          <div
            className="
              hidden
              lg:block
              absolute
              top-1/2
              left-[75%]
              w-2
              h-2
              -translate-y-1/2
              rounded-full
              bg-[#1EC957]
              shadow-[0_0_12px_rgba(30,201,87,.7)]
            "
          />


          {/* CARDS */}

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
              lg:gap-6
              relative
              z-10
            "
          >

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="
                  glass-light
                  glass-hover
                  rounded-2xl
                  p-6
                  min-h-[150px]
                  flex
                  items-center
                  gap-5
                  lg:block
                  lg:min-h-[180px]
                "
              >

                <div
                  className="
                    icon-box
                    shrink-0
                    lg:mb-5
                  "
                >
                  <span className="text-lg">
                    {['♙', '✓', '◎', '↗'][index]}
                  </span>
                </div>

                <div>

                  <div
                    className="
                      text-sm
                      text-[#148C48]
                      font-medium
                      mb-2
                    "
                  >
                    {step.number}
                  </div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-[#0B2023]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-1.5
                      text-sm
                      text-[#52676A]
                      leading-5
                    "
                  >
                    {step.text}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;