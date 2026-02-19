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
        'orange-primary': '#F97316',
        'orange-vivid': '#FF6B00',
        'orange-light': '#FB923C',
        'orange-deep': '#EA580C',
        'orange-warm': '#FDBA74',
        'orange-hot': '#FF4500',
        'sunset-coral': '#FF6347',
        'amber-gold': '#F59E0B',
        'cream-white': '#FFFBEB',
        'soft-white': '#FFF7ED',
        'warm-gray': '#FDF4E8',
        'charcoal': '#292524',
        'warm-black': '#1C1917',
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
