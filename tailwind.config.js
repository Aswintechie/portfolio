/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Space Color Palette
        space: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Cosmic Deep Space
        cosmos: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Stellar Accents (Bright Stars)
        stellar: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Nebula Colors (Cosmic Dust)
        nebula: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          violet: '#7c3aed',
          indigo: '#6366f1',
          magenta: '#d946ef',
        },
        // Cosmic Energy
        energy: {
          electric: '#00d4ff',
          plasma: '#ff006e',
          quantum: '#8338ec',
          nuclear: '#06ffa5',
          solar: '#ffbe0b',
          cosmic: '#fb8500',
        },
        // Galaxy Colors
        galaxy: {
          center: '#1a1a2e',
          arm: '#16213e',
          dust: '#0f0f23',
          star: '#ffffff',
          gas: '#4a5568',
        },
        // Legacy colors (keeping for compatibility)
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        cosmic: ['Orbitron', 'Exo', 'Inter', 'system-ui', 'sans-serif'],
        space: ['Exo 2', 'Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out',
        fadeInLeft: 'fadeInLeft 0.8s ease-out',
        fadeInRight: 'fadeInRight 0.8s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        // Space-themed animations
        twinkle: 'twinkle 2s ease-in-out infinite',
        'twinkle-slow': 'twinkle 4s ease-in-out infinite',
        'twinkle-fast': 'twinkle 1s ease-in-out infinite',
        'float-cosmic': 'float-cosmic 6s ease-in-out infinite',
        drift: 'drift 8s linear infinite',
        orbit: 'orbit 12s linear infinite',
        'pulse-cosmic': 'pulse-cosmic 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'nebula-float': 'nebula-float 10s ease-in-out infinite',
        'star-birth': 'star-birth 3s ease-out forwards',
        'warp-speed': 'warp-speed 0.8s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Space-themed keyframes
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'float-cosmic': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(3deg)' },
          '66%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        'pulse-cosmic': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
            textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.2)',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.8)',
          },
        },
        'nebula-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(1deg)' },
          '50%': { transform: 'translateY(0px) translateX(20px) rotate(0deg)' },
          '75%': { transform: 'translateY(20px) translateX(10px) rotate(-1deg)' },
        },
        'star-birth': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.5)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'warp-speed': {
          '0%': { transform: 'translateX(0) scaleX(1)', opacity: '1' },
          '50%': { transform: 'translateX(100px) scaleX(2)', opacity: '0.5' },
          '100%': { transform: 'translateX(200px) scaleX(4)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-modern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        // Space-themed gradients
        'gradient-cosmic': 'linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #312e81 100%)',
        'gradient-nebula': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
        'gradient-stellar':
          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
        'gradient-galaxy':
          'conic-gradient(from 180deg at 50% 50%, #020617, #1e1b4b, #312e81, #4338ca, #020617)',
        'gradient-plasma': 'linear-gradient(45deg, #ff006e, #8338ec, #00d4ff)',
        'gradient-energy':
          'radial-gradient(ellipse at center, rgba(0,212,255,0.3) 0%, transparent 70%)',
        'gradient-deep-space':
          'linear-gradient(180deg, #000000 0%, #0f0f23 30%, #1a1a2e 70%, #16213e 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        cosmic: '0 0 50px rgba(59, 130, 246, 0.3), 0 0 100px rgba(139, 92, 246, 0.1)',
        stellar: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.1)',
        nebula: '0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(139, 92, 246, 0.2)',
        energy: '0 0 25px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 212, 255, 0.2)',
        plasma: '0 0 35px rgba(255, 0, 110, 0.4), 0 0 70px rgba(131, 56, 236, 0.2)',
      },
    },
  },
  plugins: [],
};
