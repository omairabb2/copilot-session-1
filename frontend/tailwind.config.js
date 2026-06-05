/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#111827",
        secondary: "#FFEDD5",
        tertiary: "#E0E7FF",
        neutral: "#FFFFFF",
        surface: "#E5E7EB",
        "text-primary": "#6B7280",
        "text-secondary": "#111827",
        accent: "#111827",
      },
      borderRadius: {
        card: "32px",
        "2xl": "28px",
        full: "9999px",
      },
      boxShadow: {
        card: "0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px",
        glass: "0px 0px 0px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0), rgba(0,0,0,0.04) 0px 8px 30px 0px",
      },
    },
  },
  plugins: [],
};
