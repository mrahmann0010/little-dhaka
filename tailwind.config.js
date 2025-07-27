/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-bg': '#fff3ec',
        'main-text':'rgb(10,67,65)',
        'main-btn-bg': 'rgb(0,93,92)',

      }
    },
  },
  plugins: [],
}