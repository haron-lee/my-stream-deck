/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1A1A1A',
        bg: '#242424',
      },
      boxShadow: {
        'stream-inner': 'inset 0 0px 10px 0 rgb(255 255 255 / 0.05)',
      },
      screens: {
        small: '450px',
        medium: '600px',
      },
      backgroundImage: {
        plus: "url('/assets/icon-add.svg')",
      },
    },
  },
  plugins: [],
};
