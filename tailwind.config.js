/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // slate-700
        input: "var(--color-input)", // slate-800
        ring: "var(--color-ring)", // violet-600
        background: "var(--color-background)", // slate-900
        foreground: "var(--color-foreground)", // slate-200
        primary: {
          DEFAULT: "var(--color-primary)", // violet-600
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // sky-500
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-700
          foreground: "var(--color-muted-foreground)", // slate-400
        },
        accent: {
          DEFAULT: "var(--color-accent)", // pink-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // slate-800
          foreground: "var(--color-popover-foreground)", // slate-200
        },
        card: {
          DEFAULT: "var(--color-card)", // slate-800
          foreground: "var(--color-card-foreground)", // slate-200
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        surface: "var(--color-surface)", // slate-800
        'text-primary': "var(--color-text-primary)", // slate-200
        'text-secondary': "var(--color-text-secondary)", // slate-400
        'gradient-from': "var(--color-gradient-from)", // violet-600
        'gradient-to': "var(--color-gradient-to)", // sky-500
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '280': '70rem',
      },
      zIndex: {
        '30': '30',
        '40': '40',
        '45': '45',
        '50': '50',
      },
      backdropBlur: {
        'command': '8px',
      },
      boxShadow: {
        'command': '0 1px 3px rgba(0, 0, 0, 0.12)',
        'elevation': '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'micro': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideIn: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
        slideIn: "slideIn 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}