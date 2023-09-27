/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "2rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "2rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "2rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "4xl": [
        "2.5rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "1",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "1.1",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "1",
        },
      ],
      "9xl": [
        "8rem",
        {
          lineHeight: "1",
        },
      ],
      "10xl": [
        "10rem",
        {
          lineHeight: "1",
        },
      ],
      "11xl": [
        "12rem",
        {
          lineHeight: "1",
        },
      ],
      "12xl": [
        "14rem",
        {
          lineHeight: "1",
        },
      ],
      "13xl": [
        "16rem",
        {
          lineHeight: "1",
        },
      ],
      "14xl": [
        "20rem",
        {
          lineHeight: "1",
        },
      ],
      "15xl": [
        "24rem",
        {
          lineHeight: "1",
        },
      ],
      "16xl": [
        "30rem",
        {
          lineHeight: "1",
        },
      ],
      "17xl": [
        "40rem",
        {
          lineHeight: "1",
        },
      ],
      "18xl": [
        "50rem",
        {
          lineHeight: "1",
        },
      ],
      "19xl": [
        "60rem",
        {
          lineHeight: "1",
        },
      ],
      "20xl": [
        "70rem",
        {
          lineHeight: "1",
        },
      ],
    },
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
          '50': 'hsl(22, 100%, 96%)',
    '100': 'hsl(25, 100%, 91%)',
    '200': 'hsl(22, 100%, 82%)',
    '300': 'hsl(20, 100%, 71%)',
    '400': 'hsl(16, 100%, 60%)',
    '500': 'hsl(14, 100%, 52%)',
    '600': 'hsl(9, 100%, 50%)',
    '700': 'hsl(6, 98%, 40%)',
    '800': 'hsl(4, 87%, 34%)',
    '900': 'hsl(4, 83%, 28%)',
    '950': 'hsl(1, 89%, 15%)',
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
