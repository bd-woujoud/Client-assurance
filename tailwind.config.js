/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#45B7D1',
        success: '#96CEB4',
        warning: '#FFEAA7',
        info: '#74B9FF',
        dark: '#2D3436'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        float: 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        shake: 'shake 0.5s ease-in-out',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};
