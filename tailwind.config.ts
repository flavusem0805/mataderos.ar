import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        chicago: {
          DEFAULT: '#1E5631',
          dark: '#143D22',
          light: '#2A7343'
        },
        carbon: '#1C1C1C',
        ladrillo: {
          DEFAULT: '#B5502D',
          dark: '#973F20'
        },
        cuero: {
          DEFAULT: '#8B5E3C',
          dark: '#6D482C'
        },
        pampa: {
          DEFAULT: '#F3E9D2',
          deep: '#E7D9BA',
          surface: '#FBF6EA',
          border: '#D6C4A1'
        },
        celeste: {
          DEFAULT: '#6FA8DC',
          soft: '#DDECF9'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
