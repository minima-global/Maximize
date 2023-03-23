/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundImage: {
      'placeholder': "url('../public/assets/placeholder_image.svg')",
    },
    extend: {},
  },
  plugins: [],
}
