/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      'dark',
      'cupcake',
      'bumblebee',
      'corporate',
      'retro',
      'cyberpunk',
      'valentine',
      'pastel',
      'dracula',
      'cmyk',
      'acid',
      'lemonade',
      'coffee',
      'dim',
      'nord',
    ],
    dark: 'retro',
    base: 'true',
  },

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      Raleway: 'Raleway, sans-serif',
      Roboto: 'Roboto, sans-serif',
      Fascinate: 'Fascinate, cursive',
      Poppins: 'Poppins, sans-serif',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
