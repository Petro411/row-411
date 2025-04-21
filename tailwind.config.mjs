// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */

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
      colors: {
        // primary: "#2792A8",
        primary:"#096cb4", /* #096cb4 */
        btnPrimary: "#096cb4", /*#196D7C  #c39e35 #31b364 #23def3*/ 
        btnHover:"#0e8dcf"  /* #0b99d2  #11a6d8 #0e8dcf

        */
      },
    },
  },
  plugins: [],
};
