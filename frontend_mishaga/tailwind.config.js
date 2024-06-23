/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#FFED00',
      'lightYellow': '#FFF466',
      'white': '#FFFFFF',
      'black': {
        100: '#33333310',
        DEFAULT: '#333333'
      },
      'gray': '#0C0C0C80',
      'lightGray': '#F4F5F4',
      'semiLightGray': '#DBE2EA',
      'red': '#C42C0B',
      'green': '#118632',
      'blue': '#3C64B1',
      'lightGreen': '#5fe85a'
    },
    extend: {
      transitionDuration: {
        '4000': '4000ms',
      },
      spacing: {
        '3/10': '30%',
        '1/20': '5%',
        'profile-form': 'calc(100% - 16rem - 1.5rem)'
      }
    },
  },
  plugins: [],
}

