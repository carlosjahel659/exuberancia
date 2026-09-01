/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#070909',
        carbon2: '#0D1112',
        carbon3: '#141A1B',
        crema: '#F5F0DF',
        turquesa: '#00A8A5',
        rosa: '#E50058',
        // Rosa aclarado para textos pequeños: el rosa de marca sobre carbón no
        // llega al contraste AA (2.9:1); este queda en 8:1.
        rosaClaro: '#FF7BA6',
        amarillo: '#F0B323',
        naranja: '#E87B3A',
      },
      fontFamily: {
        display: ['Anton', 'Oswald', 'Impact', 'sans-serif'],
        alt: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(0,168,165,.35), 0 0 24px -6px rgba(0,168,165,.55)',
        neonRosa: '0 0 0 1px rgba(229,0,88,.35), 0 0 28px -6px rgba(229,0,88,.55)',
        plato: '0 30px 60px -20px rgba(0,0,0,.9)',
      },
      screens: {
        xs: '400px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.2deg)' },
        },
        sway: {
          '0%,100%': { transform: 'translateX(0) scale(1)' },
          '50%': { transform: 'translateX(10px) scale(1.03)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '.55' },
          '50%': { opacity: '1' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%)' },
          '60%,100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        sway: 'sway 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        spinSlow: 'spinSlow 60s linear infinite',
        shine: 'shine 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
