module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },

  // 👇 ESSENCIAL: não restringir para src
  roots: ["<rootDir>"],

  // 👇 garantir descoberta dos testes
  testMatch: [
    "**/tests/**/*.test.{js,jsx,ts,tsx}",
    "**/?(*.)+(spec|test).{js,jsx,ts,tsx}",
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.{js,jsx}",

    "!src/index.js",
    "!src/**/*.test.{js,jsx}",
    "!src/**/*.spec.{js,jsx}",
    "!src/**/__tests__/**",
  ],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/cypress/",
    "/webpack.*",
    "/jest.*",
    "/babel.*",
  ],

  coverageReporters: ["text", "lcov", "html"],
};