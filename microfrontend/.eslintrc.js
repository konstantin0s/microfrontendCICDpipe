module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['redux-saga', 'react-hooks'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  rules: {
    'strict': ['error', 'never'],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off', // TODO: Need to enable and fix all Exhaustive deps errors
    'react/prop-types': 'off',
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'jest/no-done-callback': 'off',
    'react/display-name': 'off', // TODO: Need to enable and fix errors
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // TODO: Need to enable and fix a11y issues
    'jsx-a11y/click-events-have-key-events': 'off', // TODO: Need to enable and fix a11y issues
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // TODO: Need to enable and fix errors
        '@typescript-eslint/no-explicit-any': 'off', // TODO: Need to enable and refactor any uses
        '@typescript-eslint/explicit-function-return-type': 'off', // TODO: Need to enable and fix errors
        '@typescript-eslint/explicit-module-boundary-types': 'off', // TODO: Need to enable and fix errors
        '@typescript-eslint/no-empty-function': 'off', // TODO: Need to enable and fix errors
        '@typescript-eslint/ban-types': 'off', // TODO: Need to enable and fix errors
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off', // TODO: Need to enable and fix errors
      },
    },
  ],
};
