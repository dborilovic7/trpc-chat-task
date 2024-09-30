/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bubbles": "#ebfcfb",
        "wild-blue-yonder": "#99abc2",
        "queen-blue": "#3f5f89",
        "medium-ruby": "#a04065",
      },
      spacing: {
        "7.5": "1.875rem",
        "18": "4.5rem",
        "chat-area-xs": "calc(100% - 81px)",
        "chat-area-sm": "calc(100% - 97px)",
        "chat-area-xl": "calc(100% - 105px)",
        "chat-area-2xl": "calc(100% - 121px)",
      },
      boxShadow: {
        "inner-ruby": "0 0 6px 0 #a04065 inset",
      },
    },
  },
  plugins: [],
}
