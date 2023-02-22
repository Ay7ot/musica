/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ['Quicksand', 'serif'],
    },
    colors: {
      'background': '#1D2123',
      'pink': '#ff49db',
      'white': "#EFEEE0",
      'yellow': "#FACD66",
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#808080',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'charcoal': '#1A1E1F',
      'blue': '#609EAF'
    },
    extend: {},
  },
  plugins: [],
}
