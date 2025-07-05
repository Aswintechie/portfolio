module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'script.js', 'style.css'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react-hooks', 'jsx-a11y'],
  globals: {
    vi: 'readonly',
    global: 'readonly',
    process: 'readonly',
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'react/no-unescaped-entities': 'off',
    'no-console': 'off', // Allow console in scripts
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  overrides: [
    {
      files: ['server/**/*.js', 'worker.js'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
} 