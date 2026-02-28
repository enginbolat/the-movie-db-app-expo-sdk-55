const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = defineConfig([
  ...expoConfig,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Noktalı virgül yasak
      'semi': ['error', 'never'],

      // any type yasak
      '@typescript-eslint/no-explicit-any': 'error',

      // Kullanılmayan import ve değişkenler yasak
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }],

      // Yanlış pozitif — i18next ve axios default/named export çakışması
      'import/no-named-as-default-member': 'off',

      // TypeScript path alias'larını çözemiyor, kapat
      'import/no-unresolved': 'off',
    },
  },
])
