const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const unusedImports = require('eslint-plugin-unused-imports')
const prettierPlugin = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

module.exports = defineConfig([
  ...expoConfig,
  prettierConfig,
  {
    plugins: {
      'unused-imports': unusedImports,
      'prettier': prettierPlugin,
    },
    rules: {
      // Prettier ihlallerini error olarak göster
      'prettier/prettier': 'error',

      // Noktalı virgül yasak (prettier ile sync)
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
