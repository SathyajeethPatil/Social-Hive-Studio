import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F7ECEF",
        hivePink: "#E83E74",
        hiveAccent: "#FF5C93",
        ink: "#1F1F1F",
        muted: "#8E8E93",
        card: "#FFF9FA"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(232, 62, 116, 0.22)",
        glass: "0 18px 48px rgba(31, 31, 31, 0.08)"
      },
      backgroundImage: {
        "hive-gradient": "linear-gradient(135deg, #E83E74, #FF5C93)",
        "soft-radial": "radial-gradient(circle at 20% 20%, rgba(255,92,147,0.28), transparent 30%), radial-gradient(circle at 85% 0%, rgba(232,62,116,0.18), transparent 26%)"
      }
    }
  },
  plugins: []
};

export default config;
