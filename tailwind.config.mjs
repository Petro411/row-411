// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */

const {colors} = require("./src/branding/index")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: colors,
    },
  },
  plugins: [],
};
