/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sun: '#FFE85B',
        palm: '#00A68C',
        wave: '#00BFB3',
        surf: '#FF6FAF',
        sky: '#FBB6CE',
        sand: '#F9E4CC',
        charcoal: '#2E2E2E',
        lightSurface: '#FFFFFF',
        lightTextSecondary: '#475569',
        darkSurface: '#1E293B',
        darkTextSecondary: '#CBD5E1',
        success: '#22C55E',
        warning: '#EAB308',
        error: '#EF4444',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
