import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-center">
          Helping students make better career decisions.
        </h2>
        <p className="text-slate-500 text-center mt-3">
          Join thousands of students who've used SkillHive to find their path.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-8 lg:gap-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-slate-900">12,000+</div>
            <div className="text-sm text-slate-500 mt-1">Assessments completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-slate-900">300+</div>
            <div className="text-sm text-slate-500 mt-1">Career paths mapped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-slate-900">4.8/5</div>
            <div className="text-sm text-slate-500 mt-1">Average satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
