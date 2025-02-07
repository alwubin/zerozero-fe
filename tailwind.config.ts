import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'mobile': '480px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
        'pro': '390px',
        'pixel': '412px',
        'promax': '430px',
      },
      colors: {
        'main': '#CD5C5C',
        'nav': '#FDFDFD',
        'point': '#F2F4F6',
        'kakao': '#fee500',
      },
      fontFamily: {
        'archivo-black': ['var(--font-archivo-black)'],
      },
    },
  },
  plugins: [],
};
export default config;
