import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'skillhive-theme';

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.setAttribute('data-theme', resolved);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) return stored;
    } catch {
      // ignore
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light') return 'light';
      if (stored === 'dark') return 'dark';
    } catch {
      // ignore
    }
    // SSR-safe: assume light until we can check
    return 'light';
  });

  // Sync resolved theme when theme state or system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const update = () => {
      const resolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    update();

    if (theme === 'system') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
