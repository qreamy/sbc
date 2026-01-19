/**
 * Design Tokens for Southbase
 * Centralized spacing, typography, colors, and layout constants
 */

export const tokens = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '7xl': '1280px', // max-w-7xl equivalent
  },

  // Section padding (vertical)
  sectionPadding: {
    mobile: 'py-16 sm:py-20',
    tablet: 'md:py-24',
    desktop: 'lg:py-32',
    large: 'xl:py-40',
  },

  // Horizontal padding
  horizontalPadding: {
    mobile: 'px-6',
    tablet: 'sm:px-8',
    desktop: 'lg:px-12',
  },

  // Typography scale
  fontSize: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl',  // 60px
    '7xl': 'text-7xl',  // 72px
    '8xl': 'text-8xl',  // 96px
  },

  // Line heights
  lineHeight: {
    tight: 'leading-tight',      // 1.25
    snug: 'leading-snug',        // 1.375
    normal: 'leading-normal',    // 1.5
    relaxed: 'leading-relaxed',   // 1.625
    loose: 'leading-loose',       // 1.75
    custom: 'leading-[1.75]',     // Custom 1.75
  },

  // Letter spacing
  letterSpacing: {
    tighter: 'tracking-tighter',  // -0.05em
    tight: 'tracking-tight',      // -0.025em
    normal: 'tracking-normal',    // 0
    wide: 'tracking-wide',        // 0.025em
    wider: 'tracking-wider',     // 0.05em
    widest: 'tracking-widest',   // 0.1em
  },

  // Border radius
  borderRadius: {
    sm: 'rounded-sm',      // 2px
    md: 'rounded-md',      // 6px
    lg: 'rounded-lg',      // 8px
    xl: 'rounded-xl',      // 12px
    '2xl': 'rounded-2xl',  // 16px
    '3xl': 'rounded-3xl',  // 24px
    full: 'rounded-full',  // 9999px
  },

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    none: 'shadow-none',
  },

  // Neutral colors (for reference)
  colors: {
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
  },

  // Spacing scale (for reference)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    header: 50, // Navigation header
  },
} as const;

// Sticky header offset for anchor scrolling
export const HEADER_OFFSET = 100; // pixels

// Max content width for readability
export const MAX_CONTENT_WIDTH = '65ch'; // Optimal line length for body text
