// Runs BEFORE the test framework — safe place for environment-level mocks

// Use the manual mock from __mocks__/react-native-gesture-handler.tsx
jest.mock('react-native-gesture-handler')

// Silence noisy console output in tests
jest.spyOn(console, 'warn').mockImplementation(() => {})
jest.spyOn(console, 'error').mockImplementation(() => {})
