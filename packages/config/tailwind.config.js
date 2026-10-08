/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,mdx}', '../../packages/*/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EA580C',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F97316',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
        },
        canvas: {
          DEFAULT: '#FFF7ED',
        },
        foreground: {
          DEFAULT: '#0F172A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A',
        },
        muted: {
          DEFAULT: '#FDF4F0',
          foreground: '#475569',
        },
        border: {
          DEFAULT: '#FCEAE1',
        },
        ring: {
          DEFAULT: '#EA580C',
        },
        hostel: '#EA580C',
        mess: '#059669',
        payment: '#0D9488',
        security: '#0369A1',
        notice: '#D97706',
        ai: '#2563EB',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        arch: '32px 32px 12px 12px',
        pill: '9999px',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
