const colors = require('./constants/AppColors')
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'av-ulight': ['AvenirNextCyrUltraLight', 'sans-serif'],
        'av-light': ['AvenirNextCyrLight', 'sans-serif'],
        'av-thin': ['AvenirNextCyrThin', 'sans-serif'],
        'av-rg': ['AvenirNextCyr', 'sans-serif'],
        'av-md': ['AvenirNextCyrMedium', 'sans-serif'],
        'av-demi': ['AvenirNextCyrDemi', 'sans-serif'],
        'av-bold': ['AvenirNextCyrBold', 'sans-serif']
      },
      gridTemplateColumns:{
        'teamcol':'50px 339px 180px 339px 50px',
        'mediumscreenteam':'40px 339px 100px 339px 50px',
        'lowscreenteam':'30px 339px 50px 339px 50px',
        'messageteam':'130px 20px 40px 20px 40px'
      },
      gridTemplateRows:{
        'teamrow':'repeat(16, minmax(0,300px)',
        'teamadd':'120px 85px 280px 40px 50px',
        'driveraddpopup':"165px 90px 90px 90px 90px 90px",
        'driverinfopopup':"225px 125px 125px 230px 100px",
        'vehiclesinfopopup':"225px 125px 125px 130px 100px"

      },
      gridRow: {
        'span-16': 'span 16 / span 16',
      },
      gridRowStart: {
        '6':'6',
        '7':'7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '16': '15',
        '16': '16',
      }
    },
    colors: colors,
    screens: {
      'xs': '640px', //720x480
      'sm': '768px', //960×582
      'md': '1024px',
      'lg': '1255px', //1280×720
      'xl': '1280px',
      '2xl': '1536px', //1920x1080
                        //2048×1080
      // CUSTOM
      '2md': '1040px',
      '1.5xl':'1380px',
      '3xl': '1635px',

      'h-md': { 'raw': '(min-height: 700px)' },
      'h-lg':{ 'raw': '(min-height: 900px)' },
      'h-xl': { 'raw': '(min-height: 1200px)' },

      
    },
    fontSize: {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'md': '0.9rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    }
  },
  variants: {
    fontSize: ['responsive', 'hover', 'focus'],
    extend: {
      backgroundColor: ['checked'],
    },
  },
  plugins: [],
  important: true
}