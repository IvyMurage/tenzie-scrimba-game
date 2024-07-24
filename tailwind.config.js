/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0B2434',
        secondary:'#F5F5F5',
        tertiary: '#59E391'
      },
      fontFamily:{
        inter: ['Inter', 'san-serif']
      }
    },
  },
  plugins: [],
}

