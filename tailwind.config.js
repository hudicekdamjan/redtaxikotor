/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#D71920', dark: '#B3131A', soft: '#FDECEC' },
        ink: { DEFAULT: '#171717', 800: '#1F1F1F', 700: '#2A2A2A', 600: '#3A3A3A' },
        mist: '#F4F4F4',
        stone: '#777777',
        viber: '#7360F2',
        whatsapp: '#1FAF54',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1240px' },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px -8px rgba(0,0,0,.12)',
        lift: '0 2px 4px rgba(0,0,0,.05), 0 24px 48px -16px rgba(0,0,0,.25)',
      },
      keyframes: {
        rise: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
}
