const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        ha: '#fb6f0d',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
