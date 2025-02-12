/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        'text-primary': '#ffffff',
        'text-secondary': '#999999',
        accent: '#FE2C55',
        'surface-dark': '#2A2A2A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
