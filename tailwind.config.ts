import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        checkoutlg: "calc(100vh - 20rem)",
        checkoutmd: "calc(100vh - 14rem)",
      },
    },
  },

  variants: {
    extends: {
      height: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
export default config;
