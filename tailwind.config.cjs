/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'ui-sans-serif', 'system-ui'],
        pixel: ['"Press Start 2P"', 'cursive']
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(15, 23, 42, 0.25)',
        pixel: '4px 4px 0px 0px rgba(0,0,0,0.2)',
        'pixel-hover': '6px 6px 0px 0px rgba(0,0,0,0.2)',
        'pixel-active': '2px 2px 0px 0px rgba(0,0,0,0.2)'
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        pixel: {
          primary: 'var(--pixel-primary)',
          accent: 'var(--pixel-accent)',
          danger: 'var(--pixel-danger)',
          success: 'var(--pixel-success)',
          warning: 'var(--pixel-warning)',
          surface: 'var(--pixel-surface)',
          background: 'var(--pixel-background)',
          text: 'var(--pixel-text)',
          border: 'var(--pixel-border-color)',
          xp: 'var(--pixel-xp)',
          coin: 'var(--pixel-coin)'
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
};
