import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // NComputing brand palette
        navy: {
          950: "#04091A",
          900: "#080F2A",
          800: "#0D1A40",
          700: "#142254",
          600: "#1A2B68",
        },
        cobalt: {
          700: "#0E3EB5",
          600: "#1455CB",
          500: "#1E66E3",
          400: "#4A87F0",
          300: "#7BAAFF",
        },
        teal: {
          600: "#00967A",
          500: "#00BFA6",
          400: "#33CEBB",
          300: "#66DDCE",
        },
        slate: {
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-navy":
          "linear-gradient(rgba(20, 85, 203, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 85, 203, 0.08) 1px, transparent 1px)",
        "gradient-cobalt": "linear-gradient(135deg, #1455CB 0%, #00BFA6 100%)",
        "gradient-dark": "linear-gradient(180deg, #080F2A 0%, #0D1A40 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(20, 85, 203, 0.35) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(20, 85, 203, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(20, 85, 203, 0.6)" },
        },
      },
      boxShadow: {
        "cobalt-sm": "0 2px 12px rgba(20, 85, 203, 0.2)",
        "cobalt-md": "0 4px 24px rgba(20, 85, 203, 0.3)",
        "cobalt-lg": "0 8px 48px rgba(20, 85, 203, 0.4)",
        card: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;