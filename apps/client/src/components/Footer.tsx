import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface-raised py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="Career Counselling Application Logo" className="h-6 w-auto object-contain" />
              <div className="text-lg font-bold text-ink">SkillHive</div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Career guidance backed by data, not guesswork.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">Platform</h3>
            <Link to="/assessment" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Career Assessment</Link>
            <Link to="/careers" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Career Search</Link>
            <Link to="/dashboard" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Dashboard</Link>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">Company</h3>
            <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">About</a>
            <a href="mailto:info@skillhivedigital.com" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Contact</a>
            <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Privacy Policy</a>
            <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer block mb-2.5">Terms of Service</a>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-surface-inset hover:bg-border flex items-center justify-center text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-surface-inset hover:bg-border flex items-center justify-center text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-surface-inset hover:bg-border flex items-center justify-center text-ink-muted hover:text-ink transition-colors duration-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm text-ink-subtle">
            &copy; 2026 SkillHive Digital. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-ink-subtle hover:text-ink-muted transition-colors">Privacy</a>
            <a href="#" className="text-sm text-ink-subtle hover:text-ink-muted transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
