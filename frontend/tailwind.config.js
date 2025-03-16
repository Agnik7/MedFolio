/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '400px',       
        '2xsm':'500px',
        'sm': '600px',      
  
        'md': '805px',
        'xmd':'1000px',

        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1536px'
        
      },
    },
  },
  plugins: [],
}

