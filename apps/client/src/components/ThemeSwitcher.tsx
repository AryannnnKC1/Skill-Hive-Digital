import { useTheme, type Theme } from '../context/ThemeContext';
import { useState, useRef, useEffect, type JSX } from 'react';

const options: { value: Theme; label: string; icon: JSX.Element }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9A9 9 0 1 1 12 3z" />
      </svg>
    ),
  },
  {
    value: 'system',
    label: 'System',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
];

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const currentIcon = resolvedTheme === 'dark' ? options[1].icon : options[0].icon;

  return (
    <div ref={menuRef} className="relative" data-theme-switcher>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Toggle theme"
        className="theme-switcher-btn flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-ink-muted hover:text-ink hover:bg-surface-raised transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
      >
        <span className="transition-transform duration-200">{currentIcon}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="theme-dropdown absolute right-0 mt-2 w-36 rounded-xl border border-border bg-surface shadow-lg overflow-hidden z-[200] animate-fade-in"
        >
          {options.map((opt) => {
            const isActive = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-accent-surface text-accent'
                    : 'text-ink-muted hover:bg-surface-raised hover:text-ink'
                }`}
              >
                {opt.icon}
                {opt.label}
                {isActive && (
                  <svg
                    className="ml-auto w-3.5 h-3.5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
