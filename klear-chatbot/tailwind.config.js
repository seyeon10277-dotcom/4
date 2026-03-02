/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        klear: {
          green: "#3d7a5c",
          lightGreen: "#e8f4ee",
          darkGreen: "#2a5640",
          cream: "#faf8f5",
        },
      },
    },
  },
  plugins: [],
};
