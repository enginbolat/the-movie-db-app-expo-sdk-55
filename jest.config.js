module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.env.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '(jest-)?react-native' +
      '|@react-native(-community)?' +
      '|expo(-.*|)?' +
      '|@expo(-.*|)?' +
      '|react-navigation' +
      '|@react-navigation/.*' +
      '|@shopify/flash-list' +
      '|react-native-gesture-handler' +
      '|react-native-reanimated' +
      ')/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/screen/**/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    '!src/**/*.styles.{ts,tsx}',
    '!src/**/*.style.{ts,tsx}',
    '!src/**/*.types.{ts,tsx}',
    '!src/**/index.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
}
