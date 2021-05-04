module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  collectCoverageFrom: [
    'src/{components,containers}/**/*.{js,jsx,ts,tsx}',
    '!src/**/types.d.ts}',
    '!src/*/*/Loadable.{js,jsx,ts,tsx}',
  ],
  // TODO: enable threshold when coverage improved
  /* coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  }, */
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
  testRegex: 'tests/.*\\.test\\.(js|ts(x?))$',
  transform: {
    '^.+\\.(ts(x?)|js)$': 'ts-jest',
  },
  snapshotSerializers: [],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
