/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ECE7B",
        textPrimary: "#1D1F22",
        textSecondary: "#8D8F9A",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      backgroundColor: {
        overlay: "rgba(57, 55, 72, 0.22)",
      },
      boxShadow: {
        custom: "0px 4px 15px rgba(168, 172, 176, 0.45)",
      },
    },
  },
  plugins: [],
};
