import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './composables/**/*.ts',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Outfit', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      colors: {
        emerald: {
          950: '#022c22',
        },
        teal: {
          950: '#042f2e',
        },
        amber: {
          950: '#451a03',
        },
        sky: {
          950: '#082f49',
        },
        red: {
          950: '#450a0a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-amber':   '0 0 20px rgba(245, 158, 11, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
