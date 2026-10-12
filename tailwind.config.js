/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0a0a0a',
          dark: '#050505',
          subtle: '#121212',
        },
        surface: {
          DEFAULT: '#141414',
          elevated: '#1a1a1a',
          border: '#262626',
          highlight: '#333333',
        },
        cream: {
          DEFAULT: '#ffedd7',
          muted: '#e2d3c1',
          dim: '#9e9488',
        },
        beacon: {
          DEFAULT: '#f59e0b',
          light: '#fde047',
          glow: 'rgba(245, 158, 11, 0.15)',
          beam: 'rgba(253, 224, 71, 0.08)',
        },
        stone: {
          accent: '#78716c',
          driftwood: '#6c5f51',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        caps: '0.15em',
      },
      animation: {
        'beacon-pulse': 'beaconPulse 4s ease-in-out infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        beaconPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionTimingFunction: {
        'emil-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'emil-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'emil-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    },
  },
  plugins: [],
}
