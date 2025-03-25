/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all files in the src directory
    "./public/**/*.{html,js,jsx,ts,tsx}", // Include files in the public directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include files in the components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};