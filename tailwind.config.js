/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./components/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        halo: "#E31B6D",
        "halo-dark": "#c2155d"
      }
    }
  },
  plugins: [],
}
