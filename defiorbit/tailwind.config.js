/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: '#1a1a40',
        nebula: '#6b48ff',
        starlight: '#e0e7ff',
      },
    },
  },
  plugins: [],
}