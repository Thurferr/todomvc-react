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
    "src/**/*.{js,jsx,ts,tsx}"
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