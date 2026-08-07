import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 lg:pt-40 pb-20 lg:pb-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent mb-6">
            Career Guidance, Reimagined
          </h2>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink">
            Find clarity in your career.<br />Not just another quiz.
          </h1>
          
          <p className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            SkillHive maps your strengths, interests, and personality to real career paths — then gives you a concrete plan to get there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/register"
              className="bg-cta hover:bg-cta-hover text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              Take the Free Assessment
            </Link>
            <Link
              to="/careers"
              className="text-ink-muted hover:text-ink font-medium px-4 py-3.5 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1"
            >
              Explore Career Paths
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 text-sm text-ink-subtle flex flex-wrap items-center justify-center gap-2">
            <span>Free to start</span>
            <span>·</span>
            <span>No credit card required</span>
            <span>·</span>
            <span>5-minute assessment</span>
          </div>

          <div className="mt-16 lg:mt-20 w-full max-w-3xl mx-auto">
            <div className="bg-surface-raised border border-border rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-200">
              <h3 className="font-semibold text-lg text-ink mb-6">Your Career Matches</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-ink-muted">Software Engineering</span>
                    <span className="text-ink">94%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-inset rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: '94%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-ink-muted">Data Science</span>
                    <span className="text-ink">87%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-inset rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-ink-muted">Product Management</span>
                    <span className="text-ink">82%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-inset rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
