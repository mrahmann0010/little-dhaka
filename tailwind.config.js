/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html" ,"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-bg': 'rgb(255,242,236)',
        'main-text':'rgb(9,54,41)',
        'main-btn-bg': 'rgb(0,93,92)',
      },
      fontFamily: {
        notoserif:["Noto Serif", "serif"],
      }
    },
  },
  plugins: [],
}