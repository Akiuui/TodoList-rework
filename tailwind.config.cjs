/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter']
      },
      colors: {
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "font-color": "var(--font-color)",
        "color-primary": "var(--color-primary)",
        "color-primary-hover": "var(--color-primary-hover)",

        "color-secondary": "var(--color-secondary)",

      }
    },
  },
  plugins: [],
}
