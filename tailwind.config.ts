import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#D4AF37',
        'gold-vivid': '#FFD700',
        'gold-light': '#F0E68C',
        'gold-deep': '#B8860B',
        'gold-warm': '#DAA520',
        'gold-hot': '#FFB800',
        'gold-accent': '#C5A55A',
        'gold-muted': '#AA8C2C',
        'dark-cream': '#1A1A1A',
        'dark-soft': '#111111',
        'dark-gray': '#1E1E1E',
        'off-white': '#F5F5F0',
        'pure-black': '#000000',
      },
      fontFamily: {
        'display': ['var(--font-space-grotesk)', 'sans-serif'],
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
