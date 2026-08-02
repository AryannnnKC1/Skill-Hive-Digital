import React from 'react';
import { Link } from 'react-router-dom';

const CareerPaths: React.FC = () => {
  const paths = [
    {
      title: "Software Engineering",
      description: "Build applications, systems, and infrastructure that power the modern world.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      title: "Data Science",
      description: "Turn raw data into insights that drive decisions across every industry.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    {
      title: "UI/UX Design",
      description: "Shape how people interact with digital products through research and design.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5"></circle>
          <circle cx="17.5" cy="10.5" r=".5"></circle>
          <circle cx="8.5" cy="7.5" r=".5"></circle>
          <circle cx="6.5" cy="12.5" r=".5"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      )
    },
    {
      title: "Finance & Accounting",
      description: "Manage capital, analyze markets, and drive financial strategy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
    {
      title: "Business & Management",
      description: "Lead teams, develop strategy, and scale organizations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      title: "Healthcare",
      description: "Improve lives through medicine, health technology, and clinical research.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="careers" className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-4">Explore Paths</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Careers you can grow into</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16">
            We cover career paths across technology, business, healthcare, and creative industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, index) => (
            <Link to="/careers" key={index} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group block">
              <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center mb-4 transition-colors duration-200">
                {path.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-blue-800 transition-colors duration-200">{path.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{path.description}</p>
              <div className="text-sm font-medium text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Learn more &rarr;
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/careers" className="text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200 cursor-pointer">
            Browse all career paths &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;
