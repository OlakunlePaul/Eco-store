/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FFF9F5',
          100: '#FFF3EB',
          200: '#FFE4D1',
          300: '#FFD5B8',
          400: '#FFC69E',
          500: '#FFB784',
          600: '#FF9F5C',
          700: '#E67E3C',
          800: '#B85F2A',
          900: '#8A4620',
        },
        earth: {
          50: '#F8F7F4',
          100: '#F1EEE9',
          200: '#E3DDD3',
          300: '#D5CCBD',
          400: '#C7BBA7',
          500: '#B9AA91',
          600: '#9A8B73',
          700: '#7A6D5B',
          800: '#5B5143',
          900: '#3C352B',
        },
        sage: {
          50: '#F5F8F5',
          100: '#EBF1EB',
          200: '#D7E3D7',
          300: '#C3D5C3',
          400: '#AFC7AF',
          500: '#9BB99B',
          600: '#7FA37F',
          700: '#638D63',
          800: '#4A6A4A',
          900: '#324732',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'warm': '0 4px 20px -2px rgba(255, 159, 92, 0.15), 0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'cozy': '0 10px 40px -10px rgba(60, 53, 43, 0.1)',
      },
    },
  },
  plugins: [],
}

