const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    // specPattern: "cypress/e2e/**/*.feature",
    specPattern: "cypress/e2e/*.js",
  },
});
