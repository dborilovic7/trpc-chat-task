/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bubbles": "#EBFCFB",
        "wild-blue-yonder": "#99ABC2",
        "queen-blue": "#3F5F89",
        "medium-ruby": "#A04065",
      },
    },
  },
  plugins: [],
}
