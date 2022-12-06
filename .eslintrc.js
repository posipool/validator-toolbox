module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['sonarjs', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/semi': 0,
    'max-len': [2, { code: 120 }],
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-confusing-arrow': 0,
    'no-unused-vars': 'off',
    'import/extensions': 0,
    'import/no-cycle': 0,
  },
}
