const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  downloadsFolder: "cypress/downloads",
  defaultCommandTimeout: 10000,
  waitForAnimations: true,
  animationDistanceThreshold: 50,
  // Add this to tell Cypress where your frontend code is
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackConfig: require('./ecommerce-frontend/webpack.config.js'),
    },
  },
});