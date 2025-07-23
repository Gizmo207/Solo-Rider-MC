/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'solo-black': '#18181b',
        'solo-red': '#e11d48',
      },
      fontFamily: {
        stencil: ['"Stardos Stencil"', 'cursive'],
      },
    },
  },
  plugins: [],
}
