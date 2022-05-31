module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        40: "repeat(auto-fit, minmax(40%, 1fr))",
      },
      keyframes: {
        growUp: {
          "0%": { height: "0px" },
          "75%": { height: "50%" },
          "100%": { height: "auto" },
        },
      },
      animation: {
        growUp: "growUp 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
