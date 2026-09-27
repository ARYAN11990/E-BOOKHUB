import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: 'var(--brand-purple)',
          purpleDark: 'var(--brand-purpleDark)',
          purpleLight: 'var(--brand-purpleLight)',
          accent: 'var(--brand-accent)',
          lavender: 'var(--brand-lavender)',
          pink: 'var(--brand-pink)',
          pinkDark: 'var(--brand-pinkDark)',
          success: 'var(--brand-success)',
          successLight: 'var(--brand-successLight)',
        },
        surface: {
          main: 'var(--surface-main)',
          soft: 'var(--surface-soft)',
          subtle: 'var(--surface-subtle)',
          dark: 'var(--surface-dark)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          placeholder: 'var(--text-placeholder)',
        },
        border: {
          light: 'var(--border-light)',
          purple: 'var(--border-purple)',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
