module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/**/*.test.{js,jsx}",
    "!src/**/*.spec.{js,jsx}",
    "!src/**/tests/**",
],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/cypress/",
    "/webpack.*",
    "/jest.*",
    "/babel.*"
  ],

  coverageReporters: ["text", "lcov", "html"],
};