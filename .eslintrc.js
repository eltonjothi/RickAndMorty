module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'max-len': ['error', { code: 1000 }],
    'linebreak-style': 0,
    'prettier/prettier': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  globals: {
    window: true,
  },
  env: {
    browser: true,
  },
};
