const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            content1: "#FFFFFF",
            content2: "#F8F9FA",
            content3: "#F1F3F5",
            content4: "#E9ECEF",
            default: {
              50: "#F8F9FA",
              100: "#F1F3F5", 
              200: "#E9ECEF",
              300: "#DEE2E6",
              400: "#CED4DA",
              500: "#ADB5BD",
              600: "#868E96",
              700: "#495057",
              800: "#343A40",
              900: "#212529",
            },
            primary: {
              50: "#EFF6FF",
              100: "#DBEAFE",
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6",
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#3B82F6",
              foreground: "#FFFFFF",
            },
            focus: "#3B82F6",
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            content1: "#111111",
            content2: "#191919",
            content3: "#222222",
            content4: "#2D2D2D",
            default: {
              50: "#FAFAFA",
              100: "#F5F5F5",
              200: "#E5E5E5",
              300: "#D4D4D4",
              400: "#A3A3A3",
              500: "#737373",
              600: "#525252",
              700: "#404040",
              800: "#262626",
              900: "#171717",
            },
            primary: {
              50: "#EFF6FF",
              100: "#DBEAFE", 
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6",
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#3B82F6",
              foreground: "#FFFFFF",
            },
            focus: "#3B82F6",
          },
        },
      },
    }),
  ],
} 