/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': {
          500: '#F39C12',
          600: '#E67E22',
          700: '#D35400',
        },
      },
    },
  },
  plugins: [],
} 