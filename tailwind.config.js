/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0080FF",
          foreground: "#FFFFFF",
          50: "#e6f3ff",
          100: "#cce7ff",
          200: "#99cfff",
          300: "#66b7ff",
          400: "#339fff",
          500: "#0080FF",
          600: "#0066cc",
          700: "#004d99",
          800: "#003366",
          900: "#001a33",
        },
        secondary: {
          DEFAULT: "#00B4D8",
          foreground: "#FFFFFF",
          50: "#e6f9ff",
          100: "#ccf3ff",
          200: "#99e7ff",
          300: "#66dbff",
          400: "#33cfff",
          500: "#00B4D8",
          600: "#0090ad",
          700: "#006c82",
          800: "#004857",
          900: "#00242b",
        },
        accent: {
          DEFAULT: "#00CFB4",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      gradients: {
        innovative: "linear-gradient(135deg, #0080FF 0%, #00B4D8 50%, #00CFB4 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

