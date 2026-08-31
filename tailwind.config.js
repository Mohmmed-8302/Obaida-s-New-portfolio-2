import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // The Cutting Room tokens (mapped to raw CSS vars in index.css)
        bg: "var(--bg)",
        canvas: "var(--bg)",
        panel: "var(--panel)",
        elev: "var(--elev)",
        text: "var(--text)",
        ink: "var(--text)",
        dim: "var(--dim)",
        "dim-2": "var(--dim-2)",
        line: "var(--line)",
        "line-2": "var(--line-2)",

        // shadcn semantic aliases
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--bg)",
        foreground: "var(--text)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        secondary: {
          DEFAULT: "var(--panel)",
          foreground: "var(--text)",
        },
        muted: {
          DEFAULT: "var(--panel)",
          foreground: "var(--dim)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          soft: "var(--accent-soft)",
          deep: "var(--accent-deep)",
        },
        card: {
          DEFAULT: "var(--panel)",
          foreground: "var(--text)",
        },
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "Arial Black", "sans-serif"],
        sans: ["Hanken Grotesk", "system-ui", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};
