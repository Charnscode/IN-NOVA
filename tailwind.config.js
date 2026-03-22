/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
       Arial: ['Arial', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0066CC',
          dark:    '#001A4D',
          accent:  '#F9A825',
          light:   '#EFF6FF',
        },
      },
      boxShadow: {
        card:  '0 4px 24px 0 rgba(0,0,0,0.07)',
        blue:  '0 8px 32px 0 rgba(0,102,204,0.18)',
        gold:  '0 8px 32px 0 rgba(249,168,37,0.25)',
      },
    },
  },
  plugins: [],
}
