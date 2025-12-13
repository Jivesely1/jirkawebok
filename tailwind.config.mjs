/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // pozadí
          bg: "#f5f7fb",       // světle modrošedé pozadí
          bgDark: "#0b0e14",   // velmi tmavé pozadí (deep navy)

          // panely / karty
          surface: "#ffffff",      // jasné bílé panely
          surfaceDark: "#11151c",  // tmavé panely s dobrou čitelností

          // ===== TEXT — OPRAVENO NA KONTRASTNÍ =====
          text: "#0f172a",          // slate-900 – primární text (perfektní kontrast)
          textMuted: "#374151",     // slate-700 – LEPŠÍ než původní #4b5563
          textDark: "#f3f4f6",      // slate-100 – čitelné v dark mode
          textMutedDark: "#d1d5db", // slate-300 – ztlumené, ale dobře viditelné

          // border
          border: "#e5e7eb",        // slate-200
          borderDark: "#1f2937",    // slate-800

          // akcent
          accent: "#6366f1",
          accentHover: "#4f46e5",
        },
      },

      boxShadow: {
        card: "0 18px 45px rgba(15,23,42,0.18)",
        soft: "0 8px 25px rgba(15,23,42,0.12)",
      },

      borderRadius: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
