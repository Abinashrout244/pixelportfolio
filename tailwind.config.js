/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0B",
        surface: "#111111",
        border: "rgba(255,255,255,0.08)",
        "text-primary": "#ECECEC",
        "text-secondary": "#B8B8B8",
        accent: "#ffffff",
        glow: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        geist: ["Geist", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        "particle-drift": {
          "0%": { transform: "translate(0, 0)", opacity: "0.2" },
          "25%": { transform: "translate(10px, -15px)", opacity: "0.15" },
          "50%": { transform: "translate(-5px, -30px)", opacity: "0.2" },
          "75%": { transform: "translate(15px, -15px)", opacity: "0.1" },
          "100%": { transform: "translate(0, 0)", opacity: "0.2" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        "particle-drift": "particle-drift 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
