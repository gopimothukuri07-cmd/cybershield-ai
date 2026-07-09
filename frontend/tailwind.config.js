/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          darker: '#050507',
          blue: '#00f0ff',
          purple: '#b026ff',
          green: '#00ff66',
          red: '#ff003c',
          panel: 'rgba(15, 15, 25, 0.7)'
        }
      }
    },
  },
  plugins: [],
}
