/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef4444",   // red
        secondary: "#111827", // dark card
        accent: "#1f2937",
      },
      boxShadow: {
        glow: "0 0 20px rgba(239, 68, 68, 0.4)",
      }
    },
  },
  plugins: [],
};