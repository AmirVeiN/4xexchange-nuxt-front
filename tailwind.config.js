/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'ph': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1720px',
    },
    colors: {
      background: "#1A1A1A",
      yellowBorder: "#FCD535",
      lightBlue: "#5A8BE7",

      mainBlue: "#21749c",

      transparent: "transparent",

      active: "#3CB371",

      orange: "#FFA500",

      purple: "#800080",

      lgtGreen: "#C9FA49",
      mdGreen: "#7A972B",
      drkGreen: "#3D4C15",

      silver: "#E1E1E1",

      greenButton: "#2E8B57",

      tradeBlue: "#182333",
      tableBlue: "#1F3250",

      tradeGreen: "#28C76F",
      tradeRed: "#EA5455",


      Green: "#008000",
      red: "#FF0000",
      gray: "#808080",
      blue: "#435fcb",
      black: "#000000",
      hardOrange: "#743517",
      yellow: "#FF8800",
      white: "#ffffff",

      back: "#F0F0F0",
      backgroundgray: "#f7f7f7",


      softGray: "#1D2327",
      gray2: "#343D44",
      softRed: "#FF4667",
      top: "#FF005C",
      down: "#FF4C14",
      back: "#F0F0F0",
      softBlue: "#7790A6",
      gridPurple: "#B195FF",
      gridGreen: "#56C53A",
      gridRed: "#FF7474",
      gridYellow: "#FFC75B",
    },
    extend: {
      keyframes: {
        'shake-vertical': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-10px)' },
          '75%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        'shake-vertical': 'shake-vertical 3s cubic-bezier(1, 1, 0, 0) infinite',
      },
      boxShadow: {
        "lg-light": "0px 5px 16px -3px rgb(0, 0, 0, 0.1);",
        "lg-light2": "0px 0px 16px -3px rgb(0, 0, 0, 0.1);",
        'inner-left-right': 'inset 4px 0 8px rgba(0, 0, 0, 0.2), inset -4px 0 8px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        lilia: ["var(--font-lilia)", ...fontFamily.sans]
      },
      backgroundImage: {
        "backgroundimage": "url('/back.png')",
        "landing": "url('/landing.jpg')",
        "shiba1": "url('/shiba1.jpg')",
        "shiba2": "url('/shiba2.jpg')",
        "shiba3": "url('/shiba3.jpg')",
        "shiba4": "url('/shiba4.jpg')",
        "shiba5": "url('/shiba5.jpg')",
        "shiba6": "url('/shiba6.jpg')",
        "shiba7": "url('/shiba7.jpg')",
        "shiba8": "url('/shiba8.jpg')",
        "footer": "url('/footer.jpg')",
        "back1": "url('/back1.jpg')",
        "back2": "url('/back2.jpg')",
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
