/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-pink': '#FFC0CB',
        'retro-beige': '#FFFDD0',
        'retro-black': '#000000',
        'retro-card': '#FEF2F2', // Slightly lighter pink/white
      },
      fontFamily: {
        'mono': ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px #000000',
        'retro-sm': '2px 2px 0px 0px #000000',
      },
      borderRadius: {
        'retro': '12px',
      }
    },
  },
  plugins: [],
}
