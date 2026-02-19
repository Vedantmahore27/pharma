module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0014',
        darkPurple: {
          900: '#05000a',
          800: '#0a0014',
          700: '#120024',
          600: '#1e003b',
        },
        purpleTheme: {
          DEFAULT: '#6A0DAD',
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#6A0DAD',
          900: '#3b0764',
        },
        medicalRed: {
          DEFAULT: '#D32F2F',
          light: '#FF4C4C',
          dark: '#9A0007',
        },
      },
      fontFamily: {
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glowPulse 3s ease-in-out infinite',
        'glow-red': 'glowPulseRed 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.2,0.9,0.3,1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        'dna-spin': 'dnaSpin 1.5s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(106,13,173,0.3), 0 0 40px rgba(106,13,173,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(106,13,173,0.5), 0 0 60px rgba(106,13,173,0.25)' },
        },
        glowPulseRed: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(211,47,47,0.4), 0 0 40px rgba(211,47,47,0.2)' },
          '50%': { boxShadow: '0 0 35px rgba(211,47,47,0.7), 0 0 70px rgba(211,47,47,0.4)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
        dnaSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
