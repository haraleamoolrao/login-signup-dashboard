import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"]
      },
      keyframes: {
        drift: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(26px, 14px, 0)" }
        }
      },
      animation: {
        drift: "drift 7s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
