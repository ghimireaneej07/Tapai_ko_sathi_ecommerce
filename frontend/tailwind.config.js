/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        herb: {
          50: "#f0fdf1",
          100: "#e6f8e9",
          200: "#cee9d5",
          300: "#9eb8a5",
          400: "#68806f",
          500: "#4caf50",
          600: "#006118",
          700: "#006f1d",
          800: "#005e17",
          900: "#213729"
        }
      },
      boxShadow: {
        mist: "0 12px 32px -4px rgba(33, 55, 41, 0.06)",
        float: "0 20px 38px -10px rgba(33, 55, 41, 0.08)"
      }
    },
  },
  plugins: [],
};
