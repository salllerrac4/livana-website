/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        primaryLight: '#8BC34A',
        background: '#F7FFF9',
        textMain: '#1F2933',
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 15px 35px rgba(46, 125, 50, 0.12)',
      },
    },
  },
  plugins: [],
};
