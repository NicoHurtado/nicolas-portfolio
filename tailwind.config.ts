import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16140F",        // warm near-black background
        ink2: "#1C1A14",       // slightly lifted surface
        clay: "#CC785C",       // Anthropic-like clay accent
        clay2: "#D4A27F",      // soft clay highlight
        cream: "#F3EEE3",      // primary text
        sand: "#E8E2D4",       // body text
        muted: "#A39C8C",      // secondary text
        line: "#3A352B",       // borders
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1760px",
      },
    },
  },
  plugins: [],
};

export default config;
