import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        white: "#F2EEE6",
        ink: "var(--ink)",
        charcoal: "var(--charcoal)",
        graphite: "var(--graphite)",
        ash: "var(--ash)",
        stone: "var(--stone)",
        fog: "var(--fog)",
        paper: "var(--paper)",
        champagne: "#E8CB94",
        bronze: "var(--bronze)",
        "approach-cream": "var(--approach-cream)",
        "approach-ink": "var(--approach-ink)",
        "approach-bronze": "var(--approach-bronze)",
        "approach-muted": "var(--approach-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.2em",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
