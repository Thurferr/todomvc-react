module.exports = {
  testEnvironment: "jsdom",

  // garante que o Jest só olha o código da aplicação
  roots: ["<rootDir>/src"],

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

    // entry point fora da cobertura
    "!src/index.js",

    // testes
    "!src/**/*.test.{js,jsx}",
    "!src/**/*.spec.{js,jsx}",
    "!src/**/tests/**",

    // segurança extra (evita pegar arquivos fora do src via glob)
    "!**/node_modules/**",
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