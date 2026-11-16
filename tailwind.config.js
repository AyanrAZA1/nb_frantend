/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        "bg-2": v("bg-2"),
        surface: v("surface"),
        "surface-2": v("surface-2"),
        text: v("text"),
        muted: v("muted"),
        border: v("border"),
        accent: v("accent"),
        "accent-2": v("accent-2"),
        glow: v("glow"),
        navy: "#0B1B2E",
        brand: { DEFAULT: "#2F8FD8", cyan: "#7FC4F0" },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px -8px rgb(var(--shadow) / 0.14)",
        lift: "0 2px 4px rgb(var(--shadow) / 0.06), 0 20px 48px -12px rgb(var(--shadow) / 0.28)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.25), 0 12px 40px -12px rgb(var(--glow) / 0.55)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        "grid-move": { from: { transform: "translate3d(0,0,0)" }, to: { transform: "translate3d(0,48px,0)" } },
        ripple: { from: { transform: "scale(0)", opacity: "0.45" }, to: { transform: "scale(4)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-duration, 40s) linear infinite",
        blink: "blink 1s step-end infinite",
        "grid-move": "grid-move 6s linear infinite",
        ripple: "ripple 600ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
