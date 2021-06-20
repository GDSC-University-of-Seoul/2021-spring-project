module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  paserser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-unused-vars': 'off',
  },
};
