/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#EAEEE7',
        device: '#2B2D29',
        'device-light': '#383B36',
        lcd: '#CBD8B8',
        'lcd-deep': '#B8C7A2',
        ink: '#1F2A1C',
        amber: '#FF8A3D',
        teal: '#4F9D8F',
        danger: '#E2574C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
