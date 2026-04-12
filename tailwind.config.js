/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070707',
        card: '#111111',
        border: '#242424',
        divider: '#1a1a1a',
        'text-primary': '#f0f0f0',
        'text-secondary': '#c8c8c8',
        'text-muted': '#424242',
        'accent-white': '#d8d8d8',
        'accent-amber': '#b89060',
        'amber-bg': '#120e06',
        'amber-border': '#28200e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
