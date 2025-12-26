import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        abrilFatface: ["'Abril Fatface'", "cursive"],
        robotoSlab: ["'Roboto Slab'", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
