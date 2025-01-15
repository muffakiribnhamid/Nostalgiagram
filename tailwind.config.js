/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD1DC',
        secondary: '#98FF98',
        accent: '#B14AED',
        background: '#FAFAFA',
        textDark: '#333333',
      },
      fontFamily: {
        vt323: ['VT323', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        permanent: ['Permanent Marker', 'cursive'],
      },
    },
  },
  plugins: [],
}
