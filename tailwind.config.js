/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        tmBlue: '#173058',
        tmRed: '#C11F48',
        tmGray: '#E0E0E0',
      },
      fontSize: {
          'xs': '0.875rem',
          'xxs': '0.625rem', // 10px
          'xxxs': '0.5rem',  // 8px
      },
    },
  },
  plugins: [],
};
