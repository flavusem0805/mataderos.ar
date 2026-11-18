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
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' }
        }
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        float: 'floatSlow 5.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }
    }
  },
  plugins: []
};

export default config;
