module.exports = {
  preset:              'ts-jest',
  clearMocks:          true,
  collectCoverage:     true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches:   100,
      functions:  100,
      lines:      100,
      statements: 100,
    },
  },
  testMatch: [
    '<rootDir>/test/**/*.spec.ts',
  ],
};
