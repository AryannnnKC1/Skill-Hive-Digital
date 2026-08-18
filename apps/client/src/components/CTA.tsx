import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-display text-ink tracking-tight mb-4">
          Ready to find your career path?
        </h2>
        <p className="text-lg text-ink-muted mb-8">
          Take a free 5-minute assessment and get matched to careers that fit your strengths.
        </p>
        <Link
          to="/register"
          className="bg-cta hover:bg-cta-hover text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer text-lg inline-block"
        >
          Start Your Free Assessment
        </Link>
        <p className="mt-4 text-sm text-ink-subtle">
          No credit card required
        </p>
      </div>
    </section>
  );
};

export default CTA;
