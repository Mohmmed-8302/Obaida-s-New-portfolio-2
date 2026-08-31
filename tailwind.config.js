import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Cinematic Editorial tokens (mapped to CSS vars in index.css)
        ink: "hsl(var(--ink))",
        canvas: "hsl(var(--bg))",
        panel: "hsl(var(--bg-panel))",
        hairline: "hsl(var(--line) / <alpha-value>)",
        dim: "hsl(var(--text-dim))",
        rose: {
          DEFAULT: "hsl(var(--accent))",
          deep: "hsl(var(--accent-deep))",
        },
        // shadcn semantic aliases
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--ink))",
        primary: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--bg-panel))",
          foreground: "hsl(var(--ink))",
        },
        muted: {
          DEFAULT: "hsl(var(--bg-panel))",
          foreground: "hsl(var(--text-dim))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--bg-panel))",
          foreground: "hsl(var(--ink))",
        },
      },
      fontFamily: {
        serif: ["Cambria Custom", "Cambria", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        mono: ["Courier New Custom", "Courier New", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "grain-shift": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-3%,-4%)" },
          "30%": { transform: "translate(2%,-2%)" },
          "50%": { transform: "translate(-2%,3%)" },
          "70%": { transform: "translate(3%,2%)" },
          "90%": { transform: "translate(-3%,1%)" },
        },
        "rose-pulse": {
          "0%,100%": { opacity: "1", boxShadow: "0 0 0 0 hsl(var(--accent) / 0.5)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 0 4px hsl(var(--accent) / 0)" },
        },
      },
      animation: {
        "grain-shift": "grain-shift 8s steps(6) infinite",
        "rose-pulse": "rose-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
