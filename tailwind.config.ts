import type { Config } from 'tailwindcss';
import { colors } from './config/colors';

export default <Config>{
  content: ['./app/**/*.{vue,js,ts}', './*.vue'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        instrument: ['Instrument Sans', 'sans-serif'],
      },
      boxShadow: {
        'button': '0px 13px 17.87px rgba(22, 86, 202, 0.19), 0px 54px 80px rgba(0, 0, 0, 0.11), inset 0px 0px 8px rgba(255, 255, 255, 0.59), inset 0px 0px 8px rgba(255, 255, 255, 0)',
        'primary-sm': '0px 13px 17.87px rgba(22, 86, 202, 0.19)',
        'primary-lg': '0px 54px 80px rgba(0, 0, 0, 0.11)',
        'inner-white': 'inset 0px 0px 8px rgba(255, 255, 255, 1)',
        'inner-white-soft': 'inset 0px 0px 8px rgba(255, 255, 255, 0)',
        'inner-light': 'inset 0px 0px 8px rgba(255, 255, 255, 0.92)',
        'button-secondary': '0px 13px 17.87px rgba(86, 189, 220, 0.19), inset 0px 0px 8px rgba(255, 255, 255, 0.59), inset 0px 0px 8px rgba(255, 255, 255, 0)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #0098C5 0%, #0098C5 100%)',
        'gradient-border': 'linear-gradient(180deg, #CEF3FE 0%, #CEF3FE 100%)',
        'gradient-primary-hover': 'linear-gradient(180deg, #0098C5 0%, #0098C5 80%, rgba(255,255,255,0.2) 100%)',
        'gradient-primary-dark': 'linear-gradient(180deg, #0098C5 0%, #0098C5 80%, rgba(0,0,0,0.2) 100%)',
        'gradient-white': 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,1) 100%)',
        'gradient-black-soft': 'linear-gradient(180deg, #0098C5 0%, #0098C5 80%, rgba(0,0,0,0.05) 100%)',
        'gradient-border-blue': 'linear-gradient(180deg, #CEDDFE 0%, #CEDDFE 100%)',
      },
    },
  },
  plugins: [],
};
