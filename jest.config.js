module.exports = {
  preset: 'jest-preset-angular',
  roots: ['projects/date-time-range-picker/src'],
  testURL: 'http://localhost',
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/projects/date-time-range-picker/src/lib/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@src/(.*)': '<rootDir>/projects/date-time-range-picker/src/$1'
  }
};
