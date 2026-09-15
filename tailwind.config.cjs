/** @type {import('tailwindcss').Config} */

// Design tokens. Raw values live as CSS variables in src/index.css;
// see docs/DESIGN-SYSTEM.md for usage rules.
const rgb = (name) => `rgb(var(--ld-${name}) / <alpha-value>)`;
const rgbAt = (name, alpha) => `rgb(var(--ld-${name}) / ${alpha})`;

module.exports = {
  content: [
    "./index.html" ,"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primitives: use only when no semantic token fits
        cream: rgb('cream'),
        forest: rgb('forest'),
        teal: rgb('teal'),
        brass: rgb('brass'),

        // Semantic: prefer these in components
        surface: {
          DEFAULT: rgb('cream'),
          inverse: rgb('forest'),
        },
        ink: {
          DEFAULT: rgb('forest'),
          muted: rgbAt('forest', 0.75),
          subtle: rgbAt('forest', 0.6),
          inverse: rgb('cream'),
          'inverse-muted': rgbAt('cream', 0.8),
          'inverse-subtle': rgbAt('cream', 0.6),
        },
        line: {
          DEFAULT: rgbAt('forest', 0.3),
          strong: rgbAt('forest', 0.6),
          faint: rgbAt('forest', 0.1),
        },
        brand: {
          DEFAULT: rgb('teal'),
          hover: rgb('forest'),
        },
        accent: rgb('brass'),
      },

      fontFamily: {
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
        bengali: ['"Noto Serif Bengali"', '"Noto Serif"', 'serif'],
      },

      // Fluid type scale: no breakpoint modifiers needed
      fontSize: {
        hero: ['clamp(2.75rem, 1.5rem + 5.2vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        display: ['clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)', { lineHeight: '1.1' }],
        heading: ['clamp(1.875rem, 1.45rem + 1.9vw, 3rem)', { lineHeight: '1.15' }],
        lead: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.65' }],
        title: ['clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)', { lineHeight: '1.4' }],
        wordmark: ['clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)', { lineHeight: '1.2' }],
        body: ['1rem', { lineHeight: '1.65' }],
        caption: ['0.875rem', { lineHeight: '1.5' }],
        tag: ['0.75rem', { lineHeight: '1.4' }],
      },

      borderRadius: {
        // Arch: the signature shape, rounded fully on top and softly below
        arch: '999px 999px 1rem 1rem',
        'arch-lg': 'clamp(8rem, 22vw, 16rem) clamp(8rem, 22vw, 16rem) 1.5rem 1.5rem',
      },

      maxWidth: {
        page: '72rem',
        prose: '36rem',
      },

      spacing: {
        gutter: 'var(--ld-gutter)',
        section: 'var(--ld-section)',
      },

      transitionTimingFunction: {
        soft: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },

      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
}
