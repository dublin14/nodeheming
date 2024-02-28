/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {

    extend: {
      animation: {
        marquee: "marquee 12s linear infinite",
        marquee2: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      colors: {
        black: "#010101",
        accent: {
         50: "hsl(27, 100%, 96%)",
          100: "hsl(29, 100%, 92%)",
          200: "hsl(26, 100%, 83%)",
          300: "hsl(25, 100%, 72%)",
          400: "hsl(21, 100%, 61%)",
          500: "hsl(19, 100%, 55%)",
          600: "hsl(15, 95%, 48%)",
          700: "hsl(12, 93%, 40%)",
          800: "hsl(9, 84%, 34%)",
          900: "hsl(10, 79%, 28%)",
          950: "hsl(8, 86%, 15%)",
        },
      },
      fontFamily: {
        serif: ["Newsreader", ...defaultTheme.fontFamily.serif],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
