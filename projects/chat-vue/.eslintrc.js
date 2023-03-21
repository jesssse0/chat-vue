module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    "prettier"
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { code: 3000 }],
    'linebreak-style': ['off', 'windows'],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'prefer-rest-params': 0,
    'space-before-function-paren': 0,
    'no-tabs': 'off',
    indent: 'off',
  },
};
