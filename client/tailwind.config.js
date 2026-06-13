/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#172554",
          teal: "#0f766e",
          saffron: "#f59e0b"
        }
      }
    }
  },
  plugins: []
};

