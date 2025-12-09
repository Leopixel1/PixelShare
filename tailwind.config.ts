import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        "gradient-from": "var(--gradient-from)",
        "gradient-via": "var(--gradient-via)",
        "gradient-to": "var(--gradient-to)",
      },
      backgroundImage: {
        "gradient-theme": "linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))",
        "gradient-theme-r": "linear-gradient(to right, var(--primary), var(--secondary))",
        "gradient-primary": "linear-gradient(to bottom right, var(--primary), var(--secondary))",
      },
    },
  },
  plugins: [],
};
export default config;
