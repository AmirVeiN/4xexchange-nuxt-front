/** @type {import('tailwindcss').Config} */
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
      yellow: "#feb72f",
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
      backgroundImage: {
        "backgroundimage": "url('/back.png')",
      },
    },
  },
  plugins: [],
};
