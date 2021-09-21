const ignorePatterns = [
  'node_modules',
  '\\.cache',
  '<rootDir>/build',
  '<rootDir>/dist',
  '<rootDir>/coverage',
  '<rootDir>/package.json',
  '<rootDir>/src/package.json',
];

/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [...ignorePatterns],
  watchPathIgnorePatterns: [...ignorePatterns],
};
