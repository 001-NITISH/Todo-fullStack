
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('./src/assets/bg.jpg')",
        "hero2": "url('./src/assets/coffee.jpg')"
      }
    },
    colors:{
      violet:{
        DEFAULT: '#60a5fa',
      },
      white:{
        DEFAULT: '#C5DBFF',
      },
      brown:{
        DEFAULT: '#E1DBCA',
        text: '#A87954',
      },
      grey:{
        DEFAULT: '#333333',
      }

    }
  },
  plugins: [],
}

