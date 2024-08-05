module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions:['ts','tsx','js','json'],
  collectCoverage: true,
  coverageDirectory:'coverage',
  coverageReporters:['json','lcov','text'],
  
};
