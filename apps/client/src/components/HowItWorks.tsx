import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-display text-transparent bg-clip-text bg-linear-to-r from-accent to-cta mb-4">
            How It Works
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display text-ink tracking-tight mb-4">
            Three steps to career clarity
          </h3>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-16"> No guesswork. No generic advice. A structured path from self-discovery to action. </p>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-5 left-[16.66%] right-[16.66%] h-px border-t border-dashed border-border-strong z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-ink text-surface flex items-center justify-center text-sm font-bold mb-5 mx-auto md:mx-0 ring-4 ring-surface">
                1
              </div>
              <h4 className="text-xl font-bold text-ink mb-3">
                Complete Your Assessment
              </h4>
              <p className="text-ink-muted leading-relaxed">
                Answer questions about your interests, work style, and strengths. Takes about 5 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-ink text-surface flex items-center justify-center text-sm font-bold mb-5 mx-auto md:mx-0 ring-4 ring-surface">
                2
              </div>
              <h4 className="text-xl font-bold text-ink mb-3">
                Get Matched to Careers
              </h4>
              <p className="text-ink-muted leading-relaxed">
                Our algorithm analyzes your profile against hundreds of career paths and ranks them by fit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 rounded-full bg-ink text-surface flex items-center justify-center text-sm font-bold mb-5 mx-auto md:mx-0 ring-4 ring-surface">
                3
              </div>
              <h4 className="text-xl font-bold text-ink mb-3">
                Build Your Roadmap
              </h4>
              <p className="text-ink-muted leading-relaxed">
                Receive a personalized plan with skills to develop, courses to take, and milestones to hit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
