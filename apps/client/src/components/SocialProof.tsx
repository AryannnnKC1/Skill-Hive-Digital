import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section
      id="about"
      className="
        relative
        py-24
        lg:py-28
        bg-white
        overflow-hidden
      "
    >

      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        <div
          className="
            glass-light
            rounded-[28px]
            p-8
            sm:p-10
            lg:p-12
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              right-0
              top-0
              w-72
              h-72
              rounded-full
              bg-[#1EC957]/6
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              grid
              lg:grid-cols-[1.2fr_.8fr]
              gap-10
              items-center
              relative
              z-10
            "
          >

            <div>

              <div className="section-label text-[#148C48]">
                About SkillHive
              </div>

              <h2
                className="
                  mt-4
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-[#0B2023]
                "
              >
                Career decisions should feel clearer.
              </h2>

              <p
                className="
                  mt-4
                  text-[#52676A]
                  leading-7
                  max-w-2xl
                "
              >
                SkillHive Digital brings assessment,
                career discovery, market information,
                and practical roadmaps into one simple
                experience — so students can move from
                uncertainty to action.
              </p>

            </div>


            <div className="grid grid-cols-3 gap-3 sm:gap-5">

              <div
                className="
                  rounded-2xl
                  border
                  border-[#0B2023]/8
                  bg-white/60
                  p-4
                  text-center
                "
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#0B2023]">
                  12K+
                </div>
                <div className="mt-1 text-xs text-[#52676A]">
                  Assessments
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#0B2023]/8
                  bg-white/60
                  p-4
                  text-center
                "
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#0B2023]">
                  300+
                </div>
                <div className="mt-1 text-xs text-[#52676A]">
                  Career paths
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#0B2023]/8
                  bg-white/60
                  p-4
                  text-center
                "
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#148C48]">
                  4.8/5
                </div>
                <div className="mt-1 text-xs text-[#52676A]">
                  Satisfaction
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SocialProof;