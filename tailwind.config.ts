import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF", // page background — always white
        surface: "#F6F6F4", // soft card surface
        ink: "#101010", // headlines / primary text
        body: "#3D3D3D", // body copy
        muted: "#8C8C8C", // secondary text
        faint: "#BDBDBD", // tertiary / ghost text
        line: "#E9E9E7", // hairline borders
        accent: "#FF4D00", // orange — small highlights only
        "accent-soft": "#FFF1EA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1440px",
      },
      letterSpacing: {
        kicker: "0.18em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
