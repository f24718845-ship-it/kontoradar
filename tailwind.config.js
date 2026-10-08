/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb', // primary blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f172a', // dark navy
          950: '#020617',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981', // emerald success / savings
          600: '#059669',
          700: '#047857',
        },
        gold: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
