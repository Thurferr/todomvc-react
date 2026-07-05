module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  roots: ["<rootDir>/src", "<rootDir>/tests"],

  testMatch: [
    "**/tests/**/*.test.{js,jsx,ts,tsx}",
    "**/?(*.)+(spec|test).{js,jsx,ts,tsx}",
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",

    "!src/index.js",
    "!babel.config.js",
    "!jest.config.js",
    "!jest.setup.js",
    "!cypress.config.js",
    "!webpack.common.js",
    "!webpack.dev.js",
    "!webpack.prod.js",
  ],

  coverageReporters: ["text", "lcov", "html"],
};