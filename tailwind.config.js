/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens driven by CSS custom properties in index.css.
        // Colour values are RGB channels wrapped in `<alpha-value>` so
        // Tailwind opacity modifiers (bg-canvas/80, border-line/40 …) work.
        // NOTE: never name a token `base` — it collides with fontSize.base and
        // `text-base` would then emit a colour as well as a font size.
        canvas: "rgb(var(--bg) / <alpha-value>)",
        elevated: "rgb(var(--bg-subtle) / <alpha-value>)",
        surface: "var(--surface)",
        surface2: "var(--surface-strong)",
        line: "var(--border)",
        line2: "var(--border-strong)",
        ink: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        faint: "rgb(var(--text-faint) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
        accent3: "rgb(var(--accent-3) / <alpha-value>)",
        palette: {
          950: "#04060d",
          900: "#060911",
          850: "#080c17",
          800: "#0a0f1c",
          700: "#0f1524",
          600: "#151d31",
        },
        sap: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#b9dbff",
          300: "#8cc4ff",
          400: "#59a4ff",
          500: "#2f88f5",
          600: "#0a6ed1",
          700: "#085bab",
          800: "#0b4d8c",
          900: "#0d3f71",
        },
        cyanx: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(110deg,#0a6ed1 0%,#2f88f5 45%,#22d3ee 100%)",
        "accent-gradient-soft":
          "linear-gradient(110deg,rgba(10,110,209,0.18) 0%,rgba(47,136,245,0.12) 50%,rgba(34,211,238,0.14) 100%)",
        "grid-fade":
          "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(47,136,245,0.16),transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.72)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 3.2s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        scan: "scan 7s linear infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(47,136,245,0.25), 0 18px 60px -20px rgba(10,110,209,0.55)",
        "glow-soft":
          "0 10px 40px -18px rgba(10,110,209,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        card: "0 24px 70px -40px rgba(0,0,0,0.9)",
      },
    },
  },
  plugins: [],
};
