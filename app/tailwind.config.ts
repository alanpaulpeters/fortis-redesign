import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Marke
        navy: "#001435",
        navy2: "#002060",
        mint: "#06d6a0",
        mint2: "#00b386",
        wa: "#25d366",
        muted: "#6e6e73",
        // Dark-Theme-Flächen (warmes Navy-Schwarz, kein reines Schwarz)
        ink: "#060b16",
        surface: "#0c1526",
        raised: "#13223c",
        frost: "#f4f7fb",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "sans-serif"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-5%, 4%) scale(0.96)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 28s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;
