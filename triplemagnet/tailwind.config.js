/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Deep blue for headers, footers, and buttons
        secondary: '#F3F4F6', // Light gray for backgrounds
        text: '#1F2937', // Dark gray for text
      },
    },
  },
  plugins: [],
};