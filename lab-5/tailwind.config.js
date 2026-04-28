/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        ink: {
          900: "#0f172a",
          800: "#1f2937",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Source Sans 3'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 25px rgba(15, 23, 42, 0.08)",
        lift: "0 12px 30px rgba(37, 99, 235, 0.18)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(59, 130, 246, 0.2), rgba(255, 255, 255, 0) 60%)",
      },
    },
  },
  plugins: [],
}

