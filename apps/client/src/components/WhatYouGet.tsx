import React from 'react';

const WhatYouGet: React.FC = () => {
  return (
    <section id='features' className='py-20 lg:py-32 bg-surface-inset'>
      <div className='max-w-6xl mx-auto px-6 sm:px-8'>
        <div className='text-center'>
          <h1 className='text-3xl sm:text-4xl font-display text-transparent bg-clip-text bg-linear-to-r from-accent to-cta mb-4'>
            Features
          </h1>
          <h3 className='text-3xl sm:text-4xl font-display text-ink tracking-tight mb-6'>
            Everything you need to make a confident career decision
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {/* Feature 1 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M9 11l3 3L22 4' />
                <path d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Cognitive Assessment
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Scientifically-backed questions that map your natural strengths,
              thinking style, and personality traits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10' />
                <circle cx='12' cy='12' r='6' />
                <circle cx='12' cy='12' r='2' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Smart Career Matching
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Your profile is compared against real career data to find paths
              where you'd genuinely thrive.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 18v-6a9 9 0 0118 0v6' />
                <path d='M21 19a2 2 0 01-2 2h-1c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2h3zM3 19a2 2 0 002 2h1c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2H3z' />
                <path d='M12 9v2' />
                <path d='M12 15v2' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Personalized Roadmaps
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Step-by-step plans with specific skills, courses, and projects
              tailored to your target career.
            </p>
          </div>

          {/* Feature 4 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='22 7 13.5 15.5 8.5 10.5 2 17' />
                <polyline points='16 7 22 7 22 13' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Market Insights
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Real salary data, growth projections, and demand trends for every
              career path we recommend.
            </p>
          </div>

          {/* Feature 5 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Career Library
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Browse and save careers across industries. Compare requirements,
              salaries, and day-to-day responsibilities.
            </p>
          </div>

          {/* Feature 6 */}
          <div className='card p-7 cursor-pointer transition-all duration-300'>
            <div className='w-11 h-11 rounded-xl bg-accent-surface flex items-center justify-center mb-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='text-accent w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='12' y1='20' x2='12' y2='10' />
                <line x1='18' y1='20' x2='18' y2='4' />
                <line x1='6' y1='20' x2='6' y2='16' />
              </svg>
            </div>
            <h4 className='text-lg font-semibold text-ink mb-2'>
              Progress Tracking
            </h4>
            <p className='text-ink-muted text-sm leading-relaxed'>
              Monitor your skill development, completed milestones, and how
              you're trending toward your career goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
