/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weber: {
          50: '#f1f9f3',
          100: '#def2e4',
          200: '#bfe5ca',
          300: '#94d2a8',
          400: '#64b881',
          500: '#3da357', // Weber Accent Green
          600: '#2e8344',
          700: '#276837',
          800: '#23532f',
          900: '#1e4428',
          950: '#0b2514',
        },
        surface: {
          warm: '#FBF9F5',
          cream: '#F5F3EF',
          card: '#FFFFFF',
          border: '#E8E5DF',
          borderSubtle: 'rgba(15, 23, 42, 0.08)',
        },
        slate: {
          950: '#0B120D',
          900: '#0F172A',
          850: '#15211B',
          800: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
        'hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(61, 163, 87, 0.15)',
      }
    },
  },
  plugins: [],
}
