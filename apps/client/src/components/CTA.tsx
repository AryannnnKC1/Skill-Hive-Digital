import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-24
        lg:py-32
        hero-background
      "
    >

      <div
        className="
          absolute
          inset-0
          tech-grid
          opacity-60
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          left-[10%]
          top-1/2
          w-2
          h-2
          rounded-full
          bg-[#1EC957]
          shadow-[0_0_15px_rgba(30,201,87,.8)]
          float-subtle
        "
      />

      <div
        className="
          absolute
          right-[15%]
          top-[25%]
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
          max-w-4xl
          mx-auto
          px-6
          sm:px-8
          text-center
          relative
          z-10
        "
      >

        <div
          className="
            glass-strong
            rounded-[28px]
            px-6
            py-12
            sm:px-10
            sm:py-14
            border-white/15
          "
        >

          <div className="section-label justify-center">
            Start Your Journey
          </div>

          <h2
            className="
              mt-4
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-normal
              tracking-[0.01em]
              text-white
              display-heading
            "
          >
            Ready to find your career path?
          </h2>

          <p
            className="
              mt-5
              text-base
              sm:text-lg
              text-white/60
              max-w-2xl
              mx-auto
            "
          >
            Take a free 5-minute assessment and discover
            career directions that fit your strengths
            and interests.
          </p>

          <Link
            to="/register"
            className="
              btn-primary
              mt-8
              px-7
              py-3.5
              text-base
            "
          >
            Start Your Free Assessment
            <span>→</span>
          </Link>

          <p className="mt-4 text-xs text-white/35">
            No credit card required
          </p>

        </div>

      </div>

    </section>
  );
};

export default CTA;