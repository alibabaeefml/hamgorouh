/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        brown:'#EAE0DA',
        yellow:'#F7F5EB',
        navy:'#12263A',
        red:'#FF4A4A',
        gray:'#A2A2A1'
      },
      fontSize:{
        '32':['32px',{
          fontWeight: '700',
        }],
        '24':'24px',
        '20':'20px',
        '18':'18px',
        '16':'16px',
        '14':'14px',
        '12':'12px',
      },
    },
  },
  plugins: [],
}