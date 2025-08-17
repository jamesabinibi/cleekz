import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: { extend: { borderRadius: { "2xl": "1.25rem" } } },
  plugins: [require("@tailwindcss/forms")]
};
export default config;
