module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        tick: {
          "0%, 3%, 100%": { strokeDashoffset: "12" },
          "50%": { strokeDashoffset: "0" },
        },
        loaderMask: {
          "0%": { height: "100%" },
          "100%": { height: "0%" },
        },
      },
      animation: {
        tick: "tick 2s linear infinite",
        loaderMask: "loaderMask 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
