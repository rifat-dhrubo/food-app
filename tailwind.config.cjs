// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nunito)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
