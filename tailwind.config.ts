import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        onyx: {
          900: "var(--onyx-900)",
          800: "var(--onyx-800)",
          700: "var(--onyx-700)",
        },
        gold: {
          700: "var(--gold-700)",
          500: "var(--gold-500)",
          300: "var(--gold-300)",
          100: "var(--gold-100)",
        },
        parchment: "var(--parchment)",
        paper: "var(--paper)",
        ink: {
          900: "var(--ink-900)",
          600: "var(--ink-600)",
        },
        his: { 500: "var(--his-500)" },
        hers: { 500: "var(--hers-500)" },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        display: [
          "clamp(2.25rem,7vw,6.5rem)",
          { lineHeight: "0.9", letterSpacing: "-0.02em" },
        ],
        h2: [
          "clamp(1.75rem,4vw,3.25rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
        body: ["clamp(0.95rem,1.05vw,1.0625rem)", { lineHeight: "1.7" }],
      },
      spacing: {
        section: "clamp(6rem,12vh,12rem)",
        gutter: "clamp(1.25rem,5vw,6rem)",
      },
      maxWidth: {
        readable: "68ch",
        quote: "44ch",
      },
      borderRadius: {
        luxury: "2px",
      },
      transitionDuration: {
        instant: "var(--dur-instant)",
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        cine: "var(--dur-cine)",
        epic: "var(--dur-epic)",
      },
      transitionTimingFunction: {
        "out-soft": "var(--ease-out-soft)",
        "in-out-lux": "var(--ease-in-out-lux)",
        glass: "var(--ease-glass)",
        mask: "var(--ease-mask)",
      },
      zIndex: {
        content: "0",
        nav: "10",
        particles: "20",
        pinned: "30",
        drag: "40",
        cursor: "60",
        mobileNav: "80",
        preloader: "100",
      },
      boxShadow: {
        light: "0 20px 60px rgb(23 20 15 / 0.08)",
      },
    },
  },
  plugins: [forms],
};

export default config;
