const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Add these configurations
    video: false, // Disable video recording to speed up tests in CI
    screenshotOnRunFailure: true, // Enable screenshots on test failure
    defaultCommandTimeout: 10000, // Increase timeout for commands
    pageLoadTimeout: 30000, // Increase page load timeout
  },
  // Add these for CI environment
  retries: {
    runMode: 2, // Retry failed tests up to 2 times in CI
    openMode: 0,
  },
});