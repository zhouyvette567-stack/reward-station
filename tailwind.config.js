/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FFFDF7', 100: '#FFF9E8', 200: '#FFF3D1', 300: '#FFEAB3', 400: '#FFE09A', 500: '#F5D68A' },
        peach: { 100: '#FFE5DC', 200: '#FFD4C4', 300: '#FFBFAA', 400: '#FFA88C' },
        mint: { 100: '#E0F5E9', 200: '#C1EBD4', 300: '#9FDDBB', 400: '#7DCBA2' },
        lavender: { 100: '#F0E6FA', 200: '#E2D1F5', 300: '#D1B8EE', 400: '#BE9DE5' },
        sky: { 100: '#E6F4FA', 200: '#D1EBF5', 300: '#B8DEEE', 400: '#9DCFE5' },
      },
      fontFamily: { sans: ['Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'] },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(255, 255, 255, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(255, 255, 255, 0.25)',
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 40px rgba(255, 224, 154, 0.3)',
      },
    },
  },
  plugins: [],
}
