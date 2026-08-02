import React from 'react';

const AuthHero: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-1 flex-col justify-center bg-slate-50 border-l border-slate-200 p-12 xl:p-24 relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-lg">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Navigate Your Professional Path
        </h2>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Discover personalized pathways, connect with vetted industry experts, and take command of your learning journey.
        </p>

        <ul className="space-y-6 mb-12">
          {[
            'Personalized career matching algorithms',
            '1-on-1 mentorship with industry leaders',
            'Actionable learning roadmaps'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-slate-900">5K+</p>
              <p className="text-sm text-slate-500">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">120+</p>
              <p className="text-sm text-slate-500">Mentors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">95%</p>
              <p className="text-sm text-slate-500">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
