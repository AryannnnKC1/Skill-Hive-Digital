import React from 'react';

const AuthHero: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-1 flex-col justify-center bg-surface-inset border-l border-border p-12 xl:p-24 relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-lg">
        <h2 className="text-3xl font-display text-ink mb-6">
          Navigate Your Professional Path
        </h2>
        <p className="text-lg text-ink-muted mb-10 leading-relaxed">
          Discover personalized pathways, connect with vetted industry experts, and take command of your learning journey.
        </p>

        <ul className="space-y-6 mb-12">
          {[
            'Personalized career matching algorithms',
            '1-on-1 mentorship with industry leaders',
            'Actionable learning roadmaps'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cta-surface flex items-center justify-center mt-0.5">
                <svg className="w-3.5 h-3.5 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-ink-muted">{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-8 border-t border-border">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-ink">5K+</p>
              <p className="text-sm text-ink-muted">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">120+</p>
              <p className="text-sm text-ink-muted">Mentors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">95%</p>
              <p className="text-sm text-ink-muted">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
