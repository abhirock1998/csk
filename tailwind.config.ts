import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text_color: "#181818",
        secondary_text: "#757575",
        brand_color: "#34c759",
        shade: "#f9fbf9",
      },
      borderColor: {
        brand_color: "#34c759",
      },
      backgroundColor: {
        brand_color: "#34c759",
        shade: "#f9fbf9",
        whatsapp: "#075e54",
      },
    },
  },
  plugins: [],
} satisfies Config;
