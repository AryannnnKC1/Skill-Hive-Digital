import re

with open('src/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

new_top = """@import "tailwindcss";

/* ─── Theme Tokens (Light Mode Default) ──────────────────────── */
:root {
  color-scheme: light;

  /* Ink (text) */
  --color-ink: #0f172a;
  --color-ink-muted: #334155;
  --color-ink-subtle: #64748b;

  /* Surfaces */
  --color-surface: #ffffff;
  --color-surface-raised: #f8fafc;
  --color-surface-inset: #f1f5f9;

  /* Borders */
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;

  /* Accent – Deep Teal */
  --color-accent: #0f766e;
  --color-accent-hover: #115e59;
  --color-accent-light: #14b8a6;
  --color-accent-surface: #f0fdfa;
  --color-accent-border: #99f6e4;

  /* CTA – Emerald Green */
  --color-cta: #059669;
  --color-cta-hover: #047857;
  --color-cta-surface: #ecfdf5;

  /* Shadow */
  --shadow-card: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
  --shadow-card-hover: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05);

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
}

/* ─── Dark Mode Tokens ────────────────────────────────────────── */
.dark {
  color-scheme: dark;

  /* Ink */
  --color-ink: #f8fafc;
  --color-ink-muted: #cbd5e1;
  --color-ink-subtle: #94a3b8;

  /* Surfaces */
  --color-surface: #020617;
  --color-surface-raised: #0f172a;
  --color-surface-inset: #1e293b;

  /* Borders */
  --color-border: #1e293b;
  --color-border-strong: #334155;

  /* Accent – Deep Teal (dark-adjusted) */
  --color-accent: #2dd4bf;
  --color-accent-hover: #5eead4;
  --color-accent-light: #14b8a6;
  --color-accent-surface: rgba(20, 184, 166, 0.12);
  --color-accent-border: rgba(20, 184, 166, 0.25);

  /* CTA – Emerald Green (dark-adjusted) */
  --color-cta: #34d399;
  --color-cta-hover: #6ee7b7;
  --color-cta-surface: rgba(52, 211, 153, 0.12);

  /* Shadow */
  --shadow-card: 0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.25);
  --shadow-card-hover: 0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -4px rgba(0,0,0,0.3);

  /* Glassmorphism */
  --glass-bg: rgba(15, 23, 42, 0.7);
  --glass-border: rgba(255, 255, 255, 0.05);
}

/* ─── Tailwind Theme ──────────────────────────────────────────── */
@theme {
  --font-sans: "Montserrat", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: "Black Ops One", ui-sans-serif, system-ui, sans-serif;

  --color-ink: var(--color-ink);
  --color-ink-muted: var(--color-ink-muted);
  --color-ink-subtle: var(--color-ink-subtle);
  --color-surface: var(--color-surface);
  --color-surface-raised: var(--color-surface-raised);
  --color-surface-inset: var(--color-surface-inset);
  --color-border: var(--color-border);
  --color-border-strong: var(--color-border-strong);
  --color-accent: var(--color-accent);
  --color-accent-hover: var(--color-accent-hover);
  --color-accent-light: var(--color-accent-light);
  --color-accent-surface: var(--color-accent-surface);
  --color-accent-border: var(--color-accent-border);
  --color-cta: var(--color-cta);
  --color-cta-hover: var(--color-cta-hover);
  --color-cta-surface: var(--color-cta-surface);
}

/* ─── Base ────────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  *, *::before, *::after {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
  body {
    font-family: var(--font-sans);
    background-color: var(--color-surface);
    color: var(--color-ink);
    line-height: 1.6;
    background-image: 
      linear-gradient(to right, var(--color-border) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-border) 1px, transparent 1px);
    background-size: 40px 40px;
    background-attachment: fixed;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, var(--color-accent-surface) 0%, transparent 40%),
                radial-gradient(circle at bottom left, var(--color-cta-surface) 0%, transparent 40%),
                var(--color-surface);
    z-index: -1;
    opacity: 0.9;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-sans);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.15;
    color: var(--color-ink);
  }

  h1, .font-display {
    font-family: var(--font-display);
    font-weight: 400;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  mark { background-color: transparent; color: inherit; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--color-ink-subtle); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    html { scroll-behavior: auto; }
  }

  input, textarea, select {
    background-color: var(--color-surface);
    color: var(--color-ink);
    border-color: var(--color-border);
  }
  input::placeholder, textarea::placeholder { color: var(--color-ink-subtle); }
}

/* ─── Utilities ───────────────────────────────────────────────── */
@layer utilities {
  .section-label {
    font-family: var(--font-display);
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .container-page {
    width: 100%;
    max-width: 72rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 640px) { .container-page { padding-left: 2rem; padding-right: 2rem; } }

  .card {
    background-color: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 1rem;
    box-shadow: var(--shadow-card);
  }
  .card:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--color-accent-border);
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-fade-in { animation: fade-in 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .bg-surface { background-color: var(--color-surface); }
  .bg-surface-raised { background-color: var(--color-surface-raised); }
  .bg-surface-inset { background-color: var(--color-surface-inset); }
  .bg-accent-surface { background-color: var(--color-accent-surface); }
  .bg-cta-surface { background-color: var(--color-cta-surface); }
  .text-ink { color: var(--color-ink); }
  .text-ink-muted { color: var(--color-ink-muted); }
  .text-ink-subtle { color: var(--color-ink-subtle); }
  .text-accent { color: var(--color-accent); }
  .text-cta { color: var(--color-cta); }
  .border-border { border-color: var(--color-border); }
  .border-border-strong { border-color: var(--color-border-strong); }
  .border-accent-border { border-color: var(--color-accent-border); }
  
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
  }
}
"""

content = re.sub(r"@import.*?/\* ═══════════════════════════════════════════════════════════════", new_top + "\n/* ═══════════════════════════════════════════════════════════════", content, flags=re.DOTALL)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(content)
