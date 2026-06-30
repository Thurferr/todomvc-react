const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ogqgvq",

  e2e: {
    baseUrl: "http://localhost:7002",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
