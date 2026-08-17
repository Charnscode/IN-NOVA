/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Arial', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0066CC',
          dark:    '#001A4D',
          accent:  '#F9A825',
        },
      },
    },
  },
  plugins: [],
}
