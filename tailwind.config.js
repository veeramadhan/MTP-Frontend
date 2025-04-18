module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        tick: {
          "0%, 3%, 100%": { strokeDashoffset: "12" },
          "50%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        tick: "tick 2s linear infinite",
      },
    },
  },
  plugins: [],
};
