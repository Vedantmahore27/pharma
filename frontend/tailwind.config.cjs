module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary:  '#04182f',
        navy: {
          900: '#020c1b',
          800: '#04182f',
          700: '#0a2540',
          600: '#0d3352',
        },
        teal: {
          DEFAULT: '#00d4c4',
          50:  '#e6faf8',
          100: '#b3f0ea',
          200: '#80e6dc',
          300: '#4ddcce',
          400: '#1ad2c0',
          500: '#00d4c4',
          600: '#00bfa5',
          700: '#009e88',
          800: '#007d6b',
          900: '#005c4e',
        },
        deepBlue: {
          DEFAULT: '#05293a',
          dark:    '#031426',
          light:   '#062b3b',
        },
      },
      fontFamily: {
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        inter:   ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'glow':      'glowPulse 3s ease-in-out infinite',
        'slide-up':  'slideUp 0.5s cubic-bezier(0.2,0.9,0.3,1) both',
        'fade-in':   'fadeIn 0.6s ease both',
        'dna-spin':  'dnaSpin 1.5s linear infinite',
        'shimmer':   'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,196,0.3), 0 0 40px rgba(0,212,196,0.15)' },
          '50%':      { boxShadow: '0 0 30px rgba(0,212,196,0.5), 0 0 60px rgba(0,212,196,0.25)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        dnaSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs:  '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
