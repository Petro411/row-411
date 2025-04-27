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
        primary:"#C89B3C", /* #096cb4  #C89B3C*/
        btnPrimary: "#C89B3C", /*#196D7C  #c39e35 #31b364 #23def3*/ 
        btnHover:"#C89B3C",  /* #C89B3C #0b99d2  #11a6d8 #0e8dcf*/
        blue:"#0078B7",
        green:"#00A86B",
        yellow:"#C89B3C",
        heading:"#666666",
        subheading:"#BBBBBB"
        // from-[#0078B7] via-[#00A86B] to-[#C89B3C]
      },
    },
  },
  plugins: [],
};
