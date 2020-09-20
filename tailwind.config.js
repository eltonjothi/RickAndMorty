const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ha: "#fb6f0d",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
