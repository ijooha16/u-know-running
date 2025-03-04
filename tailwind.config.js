/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#191971",
        secondary: "#1919707f",
        lightgray: "#eeeeee",
        darkgray: "#979797",
      }
    }
  },
  plugins: []
};
