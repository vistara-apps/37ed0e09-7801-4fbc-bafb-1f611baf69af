/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 25% 15%)',
        accent: 'hsl(170 75% 45%)',
        primary: 'hsl(220 89% 50%)',
        surface: 'hsl(210 25% 20%)',
        'text-primary': 'hsl(210 15% 90%)',
        'text-secondary': 'hsl(210 15% 70%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 6px 18px hsla(210, 80%, 60%, 0.15)',
      },
      spacing: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
