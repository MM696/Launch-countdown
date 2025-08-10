import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        abrilFatface: ["'Abril Fatface'", "cursive"],
        robotoSlab: ["'Roboto Slab'", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
