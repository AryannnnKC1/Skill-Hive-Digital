import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="
        hero-background
        tech-grid
        min-h-[760px]
        lg:min-h-[820px]
        pt-32
        lg:pt-40
        pb-20
        relative
        isolate
      "
    >

      {/* ───────── BACKGROUND DECORATION ───────── */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            left-[7%]
            top-[30%]
            w-2
            h-2
            rounded-full
            bg-[#1EC957]
            shadow-[0_0_18px_rgba(30,201,87,.9)]
            float-subtle
          "
        />

        <div
          className="
            absolute
            right-[13%]
            top-[22%]
            w-1.5
            h-1.5
            rounded-full
            bg-[#1EC957]
            shadow-[0_0_15px_rgba(30,201,87,.8)]
            float-slow
          "
        />

        <div
          className="
            absolute
            right-[26%]
            bottom-[16%]
            w-1.5
            h-1.5
            rounded-full
            bg-[#1EC957]
            shadow-[0_0_15px_rgba(30,201,87,.8)]
            float-subtle
          "
        />

        <div className="hex-decoration left-[-25px] bottom-[30px]" />

        <div className="hex-decoration right-[5%] top-[150px] scale-75" />

        <div className="hex-decoration right-[18%] bottom-[90px] scale-50 opacity-30" />

        <div className="moving-light top-[48%] left-[12%]" />

        <div className="moving-light top-[64%] left-[52%]" />

      </div>


      {/* ───────── MAIN HERO ───────── */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          relative
          z-10
        "
      >

        <div
          className="
            grid
            lg:grid-cols-[0.9fr_1.1fr]
            gap-12
            lg:gap-14
            items-center
          "
        >

          {/* LEFT SIDE */}

          <div className="max-w-2xl">

            <div className="section-label mb-7">
              Empowering Your Future
            </div>

            <h1
              className="
                text-white
                text-5xl
                sm:text-6xl
                lg:text-[68px]
                xl:text-[76px]
                font-normal
                leading-[0.98]
                tracking-[0.01em]
                display-heading
              "
            >
              Discover Your

              <span className="block gradient-text-green mt-2">
                Digital Future
              </span>

            </h1>

            <p
              className="
                mt-7
                text-base
                sm:text-lg
                text-white/65
                max-w-xl
                leading-8
              "
            >
              Personalized career paths, skill assessments,
              and smart recommendations to help you grow in
              the world of technology.
            </p>


            {/* BUTTONS */}

            <div className="mt-9 flex flex-col sm:flex-row gap-3">

              <Link
                to="/register"
                className="btn-primary px-7 py-3.5 text-sm sm:text-base"
              >
                Get Started
                <span>→</span>
              </Link>

              <Link
                to="/careers"
                className="btn-glass px-7 py-3.5 text-sm sm:text-base"
              >
                Explore Careers
                <span>→</span>
              </Link>

            </div>


            {/* SMALL TRUST TEXT */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-x-6
                gap-y-2
                text-xs
                text-white/40
              "
            >
              <span>Free to start</span>
              <span>No credit card required</span>
              <span>5-minute assessment</span>
            </div>

          </div>


          {/* RIGHT CAREER MATCH CARD */}

          <div className="relative lg:pl-4">

            <div
              className="
                absolute
                -inset-8
                rounded-[40px]
                bg-[#1EC957]/8
                blur-3xl
                pointer-events-none
              "
            />

            <div
              className="
                glass-strong
                glass-hover
                relative
                rounded-[28px]
                p-5
                sm:p-7
                lg:p-8
                border-white/20
                overflow-hidden
              "
            >

              {/* TOP GREEN LIGHT */}

              <div
                className="
                  absolute
                  top-0
                  left-1/4
                  right-1/4
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#1EC957]
                  to-transparent
                  shadow-[0_0_18px_rgba(30,201,87,.8)]
                "
              />


              <div
                className="
                  grid
                  sm:grid-cols-[0.7fr_1.3fr]
                  gap-6
                  sm:gap-7
                  items-center
                "
              >

                {/* SCORE */}

                <div className="sm:border-r sm:border-white/10 sm:pr-7">

                  <div className="text-sm text-white/80 font-medium">
                    Career Match
                  </div>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-white/65
                    "
                  >
                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-[#1EC957]
                        shadow-[0_0_10px_rgba(30,201,87,.8)]
                      "
                    />
                    High Match
                  </div>


                  {/* CIRCLE */}

                  <div
                    className="
                      relative
                      w-40
                      h-40
                      mx-auto
                      mt-5
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border-[10px]
                        border-[#1EC957]/10
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border-[10px]
                        border-transparent
                        border-t-[#1EC957]
                        border-r-[#1EC957]
                        rotate-[-25deg]
                      "
                    />

                    <div className="text-4xl font-semibold text-white">
                      92%
                    </div>

                  </div>

                </div>


                {/* RECOMMENDATION */}

                <div
                  className="
                    relative
                    min-h-[260px]
                    flex
                    flex-col
                    justify-center
                  "
                >

                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      text-white/45
                    "
                  >
                    Recommended Path
                  </div>

                  <h2
                    className="
                      mt-3
                      text-xl
                      sm:text-2xl
                      font-semibold
                      text-[#55DD7E]
                    "
                  >
                    Full Stack Developer
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-sm
                      text-sm
                      leading-6
                      text-white/55
                    "
                  >
                    Great match! Your skills and interests
                    align with this career path.
                  </p>

                  <Link
                    to="/careers"
                    className="
                      mt-5
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-2.5
                      text-sm
                      text-white/80
                      hover:bg-white/10
                      hover:text-white
                      transition-colors
                    "
                  >
                    View Roadmap
                    <span>→</span>
                  </Link>


                  {/* FLOATING LAYERS */}

                  <div
                    className="
                      absolute
                      right-1
                      bottom-2
                      sm:right-4
                      sm:bottom-0
                      w-28
                      h-28
                      sm:w-36
                      sm:h-36
                      pointer-events-none
                      float-slow
                    "
                  >

                    <div
                      className="
                        absolute
                        inset-0
                        rotate-45
                        rounded-lg
                        border
                        border-[#1EC957]/35
                        bg-[#1EC957]/8
                        backdrop-blur-sm
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-4
                        rotate-45
                        rounded-lg
                        border
                        border-[#1EC957]/30
                        bg-[#1EC957]/7
                        backdrop-blur-sm
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-8
                        rotate-45
                        rounded-lg
                        border
                        border-[#1EC957]/25
                        bg-[#1EC957]/6
                        backdrop-blur-sm
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-[42%]
                        rounded-full
                        bg-[#1EC957]
                        shadow-[0_0_25px_rgba(30,201,87,.8)]
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM LINE */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#1EC957]/35
          to-transparent
        "
      />

    </section>
  );
};

export default Hero;